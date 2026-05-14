/**
 * Robust AI Utilities for handling unstable LLM outputs
 * Specifically designed to handle hallucinations, truncations, and broken JSON.
 */

export function safeParseAIResponse(text, fallback = {}) {
  if (!text) return fallback;

  // 1. Try direct parsing first
  try {
    return JSON.parse(text);
  } catch (e) {
    // 2. Attempt to extract JSON from markdown or prose
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      let jsonStr = jsonMatch[0];
      
      try {
        return JSON.parse(jsonStr);
      } catch (innerError) {
        // 3. Last-ditch: aggressive cleaning for common LLM mistakes
        try {
          // Fix trailing commas
          jsonStr = jsonStr.replace(/,\s*\}/g, '}').replace(/,\s*\]/g, ']');
          
          // Fix missing quotes on keys (if simple enough)
          jsonStr = jsonStr.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
          
          // Fix common truncation (missing closing braces)
          const openBraces = (jsonStr.match(/\{/g) || []).length;
          const closeBraces = (jsonStr.match(/\}/g) || []).length;
          if (openBraces > closeBraces) {
            jsonStr += "}".repeat(openBraces - closeBraces);
          }
          
          return JSON.parse(jsonStr);
        } catch (finalError) {
          console.error("Aggressive JSON cleaning failed:", finalError);
        }
      }
    }
  }

  console.warn("AI Response parsing failed, using fallback:", text);
  return fallback;
}

/**
 * Ensures an AI-generated reaction/question doesn't exceed reasonable lengths
 */
export function sanitizeText(text, maxLength = 100) {
  if (!text) return "";
  let clean = text.replace(/[""]/g, '"').trim();
  if (clean.length > maxLength) {
    clean = clean.substring(0, maxLength) + "...";
  }
  return clean;
}
