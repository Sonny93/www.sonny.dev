const HTML_ESCAPE_REPLACEMENTS: Readonly<Record<string, string>> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
};

export function escapeHtml(rawText: string): string {
	return rawText.replace(
		/[&<>"']/g,
		(character) => HTML_ESCAPE_REPLACEMENTS[character] ?? character
	);
}
