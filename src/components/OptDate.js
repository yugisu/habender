const months = ["January", "March", "April", "May", "June", "July", 
               "August", "September", "October", "November", "December"];

class OptDate {
  constructor(props={daysAhead: 0}, dateObject=Date()) {
    this.objectDate = new Date(dateObject);
    
    if (props.daysAhead) { 
      this.objectDate.setDate(this.objectDate.getDate() + props.daysAhead);
    }

    this.date = this.objectDate.getDate();
    this.day = this.objectDate.getDay();
    this.month = months[this.objectDate.getMonth() - 1];
    this.year = this.objectDate.getFullYear();
  }

  getDateForComparison() {
    return `${this.month}, ${this.date} @${this.year}`;
  }

  addDays(amount) {
    this.objectDate.setDate(this.objectDate.getDate() + amount);

    this.date = this.objectDate.getDate();
    this.day = this.objectDate.getDay();
    this.month = months[this.objectDate.getMonth() - 1];
    this.year = this.objectDate.getFullYear();
  }
}

export default OptDate