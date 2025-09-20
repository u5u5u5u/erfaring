export const convertGrade = (grade: number | null | undefined): number => {
  if (grade === null || grade === undefined) {
    return 0;
  }

  if (grade >= 1 && grade <= 6) {
    return grade;
  } else if (grade >= 7 && grade <= 9) {
    return grade - 6;
  } else {
    return 0;
  }
};
