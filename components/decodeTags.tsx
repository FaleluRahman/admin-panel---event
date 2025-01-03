export const ArraytoString = (data: any) => {
  if (Array.isArray(data)) {
    if (data.length > 1) {
      return data.join(',');
    } else if (data.length === 1) {
      return data[0];
    }
  }
  return '';
}
export const StringtoArray = (data:any)=>{
    if (data) {
        return data.split(',');
      } else {
        return [];
      }
}