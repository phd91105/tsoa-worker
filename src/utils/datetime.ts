export class DateUtils {
  static getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const msSeconds = String(now.getMilliseconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}${msSeconds}`;
  }

  static findMinMaxDates(dates: string[]) {
    const parseDate = (dateStr: string) => {
      const [datePart, timePart] = dateStr.split(' ');
      const [month, day, year] = datePart.split('/').map(Number);
      let hours = 0,
        minutes = 0;

      if (timePart) {
        const [time, ampm] = timePart.split(' ');
        [hours, minutes] = time.split(':').map(Number);
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
      }

      return new Date(Date.UTC(year, month - 1, day, hours, minutes));
    };

    let minDate = parseDate(dates[0]);
    let maxDate = parseDate(dates[0]);

    dates.forEach((dateStr) => {
      const date = parseDate(dateStr);
      if (date < minDate) {
        minDate = date;
      }
      if (date > maxDate) {
        maxDate = date;
      }
    });

    return {
      minDate: minDate.toISOString().split('T')[0] + 'T00:00:00Z',
      maxDate: maxDate.toISOString().split('T')[0] + 'T23:59:59Z',
    };
  }
}
