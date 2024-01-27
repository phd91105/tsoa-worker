export class DateUtils {
  static getCurrentDateTime() {
    return new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 17);
  }

  private static parseDate = (dateStr: string) => {
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

  static findMinMaxDates(dates: string[]) {
    let minDate = this.parseDate(dates[0]);
    let maxDate = this.parseDate(dates[0]);

    dates.forEach((dateStr) => {
      const date = this.parseDate(dateStr);
      if (date < minDate) {
        minDate = date;
      }
      if (date > maxDate) {
        maxDate = date;
      }
    });

    return {
      minDate: minDate.toISOString().split('T')[0] + 'T00:00:00Z',
      maxDate: maxDate.toISOString().split('T')[0] + 'T23:59:59Z'
    };
  }
}
