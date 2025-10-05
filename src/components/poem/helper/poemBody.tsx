import RenderHtml from "react-native-render-html";
import {
  useColorScheme,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { IAppPoem } from "@/src/types";
import { Colors } from "@/src/utils/constant/colors";
import React from "react";

export const PoemBody = ({
  poem,
  maxLines = 4,
  onShowMore,
}: {
  poem: IAppPoem;
  maxLines?: number;
  onShowMore?: () => void;
}) => {
  const { width } = useWindowDimensions();
  const colorSchema = useColorScheme();
  if (!poem?.body) return null;
  const truncateHtml = (html: string, maxLines: number) => {
    // Input HTML is already cleaned, so use it directly
    const cleanedHtml = html;

    // Remove HTML tags to count actual visible text
    const textContent = cleanedHtml
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const words = textContent.split(" ");

    // Estimate words per line (rough estimation based on typical line length)
    const wordsPerLine = 8;
    const maxWords = maxLines * wordsPerLine;

    if (words.length <= maxWords) {
      return { html: cleanedHtml, isTruncated: false };
    }

    // Find the position to truncate in the cleaned HTML at sentence end
    let wordCount = 0;
    let charPosition = 0;
    let inTag = false;
    let lastSentenceEnd = 0;

    for (let i = 0; i < cleanedHtml.length; i++) {
      const char = cleanedHtml[i];

      if (char === "<") {
        inTag = true;
      } else if (char === ">") {
        inTag = false;
      } else if (!inTag) {
        if (/\s/.test(char)) {
          wordCount++;
        }

        // Check for sentence endings
        if (/[.!?]/.test(char)) {
          lastSentenceEnd = i + 1;
        }

        if (wordCount >= maxWords) {
          charPosition = lastSentenceEnd > 0 ? lastSentenceEnd : i;
          break;
        }
      }
    }

    if (charPosition === 0) return { html: cleanedHtml, isTruncated: false };

    // Truncate at sentence end and remove trailing spaces and HTML whitespace
    let truncated = cleanedHtml.substring(0, charPosition);

    // Remove trailing whitespace including HTML entities and spaces
    truncated = truncated.replace(/(\s|&nbsp;|<br\s*\/?>)*$/, "");

    // Close any unclosed tags
    const openTags = [];
    const tagRegex = /<\/?([a-zA-Z0-9]+)[^>]*>/g;
    let match;

    while ((match = tagRegex.exec(truncated)) !== null) {
      const tag = match[1].toLowerCase();
      if (match[0].startsWith("</")) {
        // Closing tag
        const lastOpenIndex = openTags.lastIndexOf(tag);
        if (lastOpenIndex !== -1) {
          openTags.splice(lastOpenIndex, 1);
        }
      } else if (!match[0].endsWith("/>")) {
        // Opening tag (not self-closing)
        openTags.push(tag);
      }
    }

    // Close remaining open tags
    openTags.reverse().forEach((tag) => {
      truncated += `</${tag}>`;
    });
    console.log("truncated", truncated);
    return { html: truncated, isTruncated: true };
  };

  // Comprehensive HTML sanitization and cleanup
  const sanitizeHtml = (html: string) => {
    let cleaned = html;

    // Step 1: Normalize and fix malformed br tags
    cleaned = cleaned
      .replace(/<\/br>/gi, "<br>") // Convert </br> to <br>
      .replace(/<br\s*\/?\s*>/gi, "<br>") // Normalize all br variants to <br>
      
    // Step 2: Remove multiple consecutive br tags (2+ becomes 1)
    cleaned = cleaned.replace(/(<br>\s*){2,}/gi, "<br>");
    
    // Step 3: Clean up structural issues
    cleaned = cleaned
      // Remove empty divs containing only br tags
      .replace(/<div>\s*<br>\s*<\/div>/gi, "<br>")
      // Remove empty paragraphs
      .replace(/<p>\s*<\/p>/gi, "")
      // Remove empty spans
      .replace(/<span[^>]*>\s*<\/span>/gi, "")
      
    // Step 4: Clean up inline styles (remove style attributes but keep content)
    cleaned = cleaned
      .replace(/<([^>]+)\s+style="[^"]*"([^>]*)>/gi, "<$1$2>")
      .replace(/<([^>]+)\s+style='[^']*'([^>]*)>/gi, "<$1$2>")
      
    // Step 5: Remove dangerous or unnecessary attributes
    cleaned = cleaned
      .replace(/\s+(class|id|onclick|onload|onerror)="[^"]*"/gi, "")
      
    // Step 6: Whitespace cleanup
    cleaned = cleaned
      .replace(/\s+/g, " ") // Multiple spaces to single space
      .replace(/>\s+</g, "><") // Remove spaces between tags
      .replace(/\s*<br>\s*/gi, "<br>") // Clean spaces around br tags
      
    // Step 7: Remove trailing br tags and whitespace
    cleaned = cleaned
      .replace(/(<br>\s*)+$/gi, "")
      .trim();
      
    // Step 8: Final validation - ensure we don't have orphaned tags
    const allowedTags = ['p', 'div', 'br', 'span', 'strong', 'em', 'b', 'i', 'u', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    
    // Remove any tags not in our allowed list (basic sanitization)
    cleaned = cleaned.replace(/<\/?([a-zA-Z0-9]+)[^>]*>/g, (match, tagName) => {
      if (allowedTags.includes(tagName.toLowerCase())) {
        // For allowed tags, strip attributes but keep the tag
        if (match.startsWith('</')) {
          return `</${tagName.toLowerCase()}>`;
        } else {
          return `<${tagName.toLowerCase()}>`;
        }
      }
      return ''; // Remove disallowed tags
    });

    return cleaned;
  };

  const cleanedOriginalHtml = sanitizeHtml(poem.body);

  const result =
    maxLines > 0
      ? truncateHtml(cleanedOriginalHtml, maxLines)
      : { html: cleanedOriginalHtml, isTruncated: false };
  const sanitizedHtml = result.html;
  const isTruncated = result.isTruncated;

  // Custom styles for HTML tags
  const tagsStyles = {
    body: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0,
    },
    p: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing between paragraphs
    },
    h1: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    div: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    h2: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    h3: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    h4: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    h5: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    h6: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    blockquote: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    pre: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    address: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    center: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    dl: {
      marginBottom: 0, // Add spacing below headings
    },
    dt: {
      marginBottom: 0, // Add spacing below headings
    },
    dd: {
      marginBottom: 0, // Add spacing below headings
    },
    ol: {
      marginBottom: 0, // Add spacing below headings
    },
    ul: {
      marginBottom: 0, // Add spacing below headings
    },
    li: {
      marginBottom: 0, // Add spacing below headings
    },
    table: {
      marginBottom: 0, // Add spacing below headings
    },
    caption: {
      marginBottom: 0, // Add spacing below headings
    },
    col: {
      marginBottom: 0, // Add spacing below headings
    },
    colgroup: {
      marginBottom: 0, // Add spacing below headings
    },
    thead: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    tbody: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    tfoot: {
      marginBottom: 0, // Add spacing below headings
    },
    tr: {
      marginBottom: 0, // Add spacing below headings
    },
    th: {
      marginBottom: 0, // Add spacing below headings
    },
    td: {
      marginBottom: 0, // Add spacing below headings
    },
    em: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    strong: {
      marginBottom: 0, // Add spacing below headings
    },
    small: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    s: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0, // Add spacing below headings
    },
    cite: {
      marginBottom: 0, // Add spacing below headings
    },
    q: {
      marginTop: 6, // Add spacing between paragraphs
      marginBottom: 0,
    },
  };

  return (
    <>
      <RenderHtml
        contentWidth={width}
        source={{ html: sanitizedHtml }}
        tagsStyles={tagsStyles}
        baseStyle={{
          fontSize: 20,
          color:
            colorSchema === "dark"
              ? "rgba(255,255,255,0.8)"
              : "rgba(0,0,0,0.8)",
          fontFamily: "Garamond",
          fontStyle: "normal",
          fontWeight: 500,
          textAlign: "left",
          lineHeight: 28,
        }}
      />
      {isTruncated && onShowMore && (
        <TouchableOpacity onPress={onShowMore} style={{ marginTop: 4 }}>
          <Text
            style={{
              fontSize: 16,
              color:
                colorSchema === "dark"
                  ? Colors.dark.primary
                  : Colors.light.primary,
              fontFamily: "Poximanova",
              fontWeight: "500",
            }}
          >
            Show more
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};
