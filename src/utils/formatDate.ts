function formatDate(dateString: string) {
  const dateEn = new Date(dateString);
  const now = new Date();

  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Check if the date is today
  if (dateEn.toDateString() === now.toDateString()) {
    return `Today, ${formatter.format(dateEn)}`;
  }

  // Check if the date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateEn.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${formatter.format(dateEn)}`;
  }

  // Format for other days
  return `${dateEn.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${formatter.format(dateEn)}`;
}

export default formatDate;
