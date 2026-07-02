const AVERAGE_READING_SPEED_WPM = 225;

export function estimateReadingTimeMinutes(content: string): number {
	return Math.round(content.split(/\s+/).length / AVERAGE_READING_SPEED_WPM);
}
