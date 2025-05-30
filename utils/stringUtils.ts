 export const getInitials = (name?: string | null) => {
    if (!name) return "";
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
    return initials.length > 2 ? initials.substring(0, 2) : initials;
  };