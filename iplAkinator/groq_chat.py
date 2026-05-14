import os
import sys
import json
import time
import math
import io
from dotenv import load_dotenv

# Fix Windows console emoji printing
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Load variables from .env file
load_dotenv()

try:
    from groq import Groq
    from colorama import init, Fore, Style
    init(autoreset=True)
except ImportError as e:
    print(f"❌ Import failed: {e}\nRun: pip install groq colorama python-dotenv")
    sys.exit(1)

# Import the logic and database directly from server.py to avoid duplication
from server import QUESTIONS, evaluate_question, PLAYERS

class IPLAkinatorCLI:
    def __init__(self, api_key: str):
        self.client = Groq(api_key=api_key)
        self.model = "llama3-8b-8192"
        # Initialize candidates with weights
        self.candidates = [dict(p, _w=max(p.get("fame", 1), 0.5)) for p in PLAYERS]
        self.asked = set()
        self.history = []
        self.q_count = 0
        self.last_cat = None

    def pick_question(self):
        n = len(self.candidates)
        if n <= 1:
            return None, None
        
        available = [q for q in QUESTIONS if q["id"] not in self.asked]
        if not available:
            return None, None
            
        scored = []
        for q in available:
            yes_w = sum(c["_w"] for c in self.candidates if evaluate_question(q, c))
            total_w = sum(c["_w"] for c in self.candidates)
            if yes_w == 0 or yes_w == total_w:
                continue
            p = yes_w / total_w
            entropy = -(p * math.log2(p)) - ((1-p) * math.log2(1-p))
            if q["cat"] == self.last_cat:
                entropy *= 0.7
            scored.append((entropy, q))
            
        if not scored:
            return None, None
            
        scored.sort(key=lambda x: -x[0])
        top_questions = [q for e, q in scored[:min(5, len(scored))]]
        
        try:
            prompt = "We are playing 20 Questions to guess an IPL cricketer.\n"
            if self.history:
                prompt += "Previous questions:\n"
                for h in self.history:
                    prompt += f"- Q: {h['q']} (Ans: {h['a']})\n"
            prompt += "\nTop candidate questions to ask next:\n"
            for i, q in enumerate(top_questions):
                prompt += f"{i}. {q['ph'][0]}\n"
            prompt += "\nRespond ONLY with a JSON object: {\"selected_index\": 0, \"rephrased_question\": \"Your conversational question here?\"}"
            
            res = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are an AI Akinator for IPL cricket. Always return valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.7
            )
            data = json.loads(res.choices[0].message.content)
            idx = data.get("selected_index", 0)
            if not isinstance(idx, int) or idx >= len(top_questions) or idx < 0: 
                idx = 0
            
            return top_questions[idx], data.get("rephrased_question", top_questions[idx]["ph"][0])
        except Exception as e:
            # Fallback if Groq API fails
            return top_questions[0], top_questions[0]["ph"][0]

    def update_probabilities(self, q, ans):
        reliability_map = {
            "nat": 0.98, "team": 0.95, "role": 0.85, "era": 0.90,
            "pos": 0.80, "bat": 0.88, "bowl": 0.88, "exp": 0.92, "award": 0.92
        }
        reliability = reliability_map.get(q["cat"], 0.85)
        
        score_map = {
            "y": 1.0, "yes": 1.0, 
            "p": 0.7, "probably": 0.7, 
            "d": 0, "dont know": 0, 
            "pn": -0.7, "probably not": -0.7, 
            "n": -1.0, "no": -1.0
        }
        score = score_map.get(ans.lower(), 0)
        abs_score = abs(score)
        
        if score != 0:
            for c in self.candidates:
                matches = evaluate_question(q, c)
                if score > 0:
                    likelihood = reliability if matches else (1 - reliability)
                else:
                    likelihood = reliability if not matches else (1 - reliability)
                
                likelihood = 0.5 + (likelihood - 0.5) * abs_score
                c["_w"] *= (likelihood * 2)

        # Prune and normalize
        if self.candidates:
            max_w = max(c["_w"] for c in self.candidates)
            self.candidates = [c for c in self.candidates if c["_w"] > max_w * 0.001]
            total = sum(c["_w"] for c in self.candidates)
            if total > 0:
                for c in self.candidates:
                    c["_w"] /= total


    def get_confidence(self):
        if not self.candidates: return 0
        if len(self.candidates) == 1: return 100
        total = sum(c["_w"] for c in self.candidates)
        top = max(c["_w"] for c in self.candidates)
        return round((top / total) * 100)

    def play(self):
        print(f"\n{Fore.YELLOW}🏏 IPL AKINATOR CLI (Powered by Groq + Local Reasoning){Style.RESET_ALL}")
        print(f"{Fore.CYAN}Think of an IPL player. I will try to guess who it is!{Style.RESET_ALL}\n")
        
        while True:
            conf = self.get_confidence()
            if len(self.candidates) <= 1 or self.q_count >= 15 or conf >= 88:
                break
                
            print(f"{Fore.YELLOW}🤔 AI is thinking...{Style.RESET_ALL}", end="\r")
            q, phrasing = self.pick_question()
            if not q:
                break
                
            self.q_count += 1
            self.last_cat = q["cat"]
            
            # Clear the thinking line
            print(" " * 30, end="\r")
            print(f"{Fore.GREEN}Q{self.q_count}:{Style.RESET_ALL} {phrasing}")
            print(f"{Fore.WHITE}[y]es, [n]o, [p]robably, [pn]robably not, [d]ont know{Style.RESET_ALL}")
            
            ans = input(f"{Fore.CYAN}> {Style.RESET_ALL}").strip().lower()
            
            self.asked.add(q["id"])
            self.history.append({"q": phrasing, "a": ans})
            self.update_probabilities(q, ans)
            
            print(f"{Fore.MAGENTA}Candidates left: {len(self.candidates)} | Confidence: {self.get_confidence()}%{Style.RESET_ALL}\n")
            
        self.candidates.sort(key=lambda c: -c["_w"])
        guess = self.candidates[0] if self.candidates else None
        
        if guess:
            try:
                prompt = f"I guessed the IPL player is {guess['name']}. Write a short, dramatic reveal (1 line). No markdown."
                res = self.client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": "You are a dramatic cricket commentator."},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0.7
                )
                reveal = res.choices[0].message.content.strip()
            except:
                reveal = f"It must be {guess['name']}!"
                
            print(f"\n{Fore.YELLOW}🎉 {reveal}{Style.RESET_ALL}")
            print(f"Role: {guess['role']} | Teams: {', '.join(guess['teams'])}")
        else:
            print(f"\n{Fore.RED}I couldn't figure it out!{Style.RESET_ALL}")

def main():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        print(f"{Fore.RED}❌ GROQ_API_KEY not found in .env file!{Style.RESET_ALL}")
        return
        
    game = IPLAkinatorCLI(api_key)
    game.play()

if __name__ == "__main__":
    main()
