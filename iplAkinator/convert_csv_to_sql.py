import csv
import os

csv_file = r'c:\Users\Administrator\Pictures\IPLAkinator\IPL.csv'
sql_file = r'c:\Users\Administrator\Pictures\IPLAkinator\IPL.sql'
table_name = 'ipl_matches'

print("Analyzing CSV for data types...")
# Pass 1: analyze types
col_types = {}
col_max_len = {}

with open(csv_file, 'r', encoding='utf-8-sig', newline='') as f:
    reader = csv.reader(f)
    headers = next(reader)
    headers = [h.strip().replace(' ', '_').replace('-', '_') for h in headers]
    # some columns might be named 'over', 'match', which are SQL keywords. I'll enclose them in backticks later.
    
    for i, h in enumerate(headers):
        col_types[i] = 'INT'
        col_max_len[i] = 0

    count = 0
    for row in reader:
        count += 1
        for i, val in enumerate(row):
            val = val.strip()
            if not val or val == 'NA':
                continue
            
            # update max len
            if len(val) > col_max_len[i]:
                col_max_len[i] = len(val)
                
            current_type = col_types[i]
            if current_type == 'TEXT':
                continue
            
            if current_type == 'INT':
                try:
                    int(val)
                except ValueError:
                    # try float
                    try:
                        float(val)
                        col_types[i] = 'FLOAT'
                    except ValueError:
                        col_types[i] = 'TEXT'
            elif current_type == 'FLOAT':
                try:
                    float(val)
                except ValueError:
                    col_types[i] = 'TEXT'

print(f"Scanned {count} rows. Generating SQL...")

# Refine types
sql_types = []
for i, h in enumerate(headers):
    t = col_types[i]
    if t == 'TEXT':
        ml = col_max_len[i]
        if ml == 0:
            sql_types.append('VARCHAR(50)')
        elif ml < 255:
            sql_types.append('VARCHAR(255)')
        else:
            sql_types.append('TEXT')
    elif t == 'FLOAT':
        sql_types.append('FLOAT')
    else:
        sql_types.append('INT')

# Pass 2: generate SQL
with open(sql_file, 'w', encoding='utf-8') as out:
    # Create Table
    out.write(f"DROP TABLE IF EXISTS `{table_name}`;\n")
    out.write(f"CREATE TABLE `{table_name}` (\n")
    col_defs = []
    for i, h in enumerate(headers):
        col_defs.append(f"    `{h}` {sql_types[i]}")
    out.write(",\n".join(col_defs) + "\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n")

    # Insert data in batches
    batch_size = 1000
    batch = []
    
    def write_batch(b):
        if not b: return
        cols = ", ".join([f"`{h}`" for h in headers])
        stmt = f"INSERT INTO `{table_name}` ({cols}) VALUES\n"
        
        values_list = []
        for row in b:
            row_vals = []
            for i, val in enumerate(row):
                val = val.strip()
                if not val or val == 'NA':
                    row_vals.append('NULL')
                else:
                    t = col_types[i]
                    if t in ('INT', 'FLOAT'):
                        row_vals.append(val)
                    else:
                        val = val.replace("'", "''").replace("\\", "\\\\")
                        row_vals.append(f"'{val}'")
            values_list.append("(" + ", ".join(row_vals) + ")")
        
        stmt += ",\n".join(values_list) + ";\n"
        out.write(stmt)
        
    with open(csv_file, 'r', encoding='utf-8-sig', newline='') as f:
        reader = csv.reader(f)
        next(reader) # skip header
        for row in reader:
            batch.append(row)
            if len(batch) >= batch_size:
                write_batch(batch)
                batch = []
        if batch:
            write_batch(batch)

print(f"SQL file generated at {sql_file}")
