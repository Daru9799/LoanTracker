import dayjs from "dayjs";

//Sprawdzenie czy jest opóźnienie w oddaniu itemu
export function checkIsLate (returnDate: Date | undefined) {
    if(!returnDate)
    {
        return true //Dla niezdefiniowanej daty zwracam true
    }
    const formattedReturnDate = dayjs(returnDate);
    const now = dayjs();
    if (formattedReturnDate.isAfter(now)) {
      return true
    } else {
      return false
    }
  }