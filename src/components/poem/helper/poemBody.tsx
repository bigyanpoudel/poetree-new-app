import RenderHtml from "react-native-render-html";
import { useColorScheme, useWindowDimensions } from "react-native";
import { IAppPoem } from "@/src/types";
import { Colors } from "@/src/utils/constant/colors";

export const PoemBody = ({
  poem,
  maxLines = 7,
}: {
  poem: IAppPoem;
  maxLines?: number;
}) => {
  const { width } = useWindowDimensions();
  const colorSchema = useColorScheme();
  if (!poem?.body) return null;
  const truncateHtml = (html: string, maxLines: number) => {
    const lines = html.split("\n"); // Split content by lines
    const truncatedLines = lines.slice(0, maxLines); // Keep only the first `maxLines`
    const truncatedHtml = truncatedLines.join("\n"); // Join the lines back into HTML

    // Add "..." if the content was truncated
    return lines.length > maxLines ? `${truncatedHtml}...` : truncatedHtml;
  };
  const sanitizedHtml =
    maxLines > 0 ? truncateHtml(poem.body, maxLines) : poem.body;

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
    <RenderHtml
      contentWidth={width}
      source={{ html: sanitizedHtml }}
      tagsStyles={tagsStyles}
      baseStyle={{
        fontSize: 14,
        color: colorSchema === "dark" ? Colors.dark.text : Colors.light.text,
        fontFamily: "Garamond",
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        lineHeight: 18,
      }}
    />
  );
};
