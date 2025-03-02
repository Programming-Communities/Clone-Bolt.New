export const countToken = (inputText) => {
    return inputText.trim().split(/\s+/).filter(word => word).length;
  };