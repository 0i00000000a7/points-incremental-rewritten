function checkBitValue(e,t){if(!Number.isInteger(e)||e<=0)throw new Error("bitIndex must be a positive integer");return 0!=(t>>>0&1<<e-1)}function toggleBitAtPosition(e,t){if(!Number.isInteger(t)||t<=0)throw new Error("position must be a positive integer");return e^1<<t-1}
function hasUpgrade(r,e){for(let i=0;i<e.length;i++){let a=e[i];if(Array.isArray(a)){if(r>=a[0]&&r<=a[1])return!0}else if(r===a)return!0}return!1}function addUpgrade(r,e){let i=!1;for(let a=0;a<e.length;a++){let f=e[a];if(Array.isArray(f)){if(r===f[0]-1){e[a]=[r,f[1]],i=!0;break}if(r===f[1]+1){e[a]=[f[0],r],i=!0;break}if(r>f[0]&&r<f[1])return e}else{if(r===f+1){e[a]=[f,r],i=!0;break}if(r===f-1){e.splice(a,0,[r,f]),i=!0;break}}}if(!i){let i=e.findIndex(e=>Array.isArray(e)?r>e[1]:r>e);if(-1===i)e.push(r);else{let a=e[i-1];if(Array.isArray(a)&&r===a[1]+1)a[1]=r;else{let f=e[i];Array.isArray(f)&&r===f[0]-1?e.splice(i,0,[a[1]+1,r]):e.splice(i,0,r)}}}return e}
class timeSpan {
  constructor(miliseconds) {
    this._ms = E(miliseconds)
  }
  static fromYears(years) {
    return new timeSpan(E(years).mul(31536e6))
  }
  static fromDays(days) {
    return new timeSpan(E(days).mul(864e5))
  }
  static fromHours(hours) {
    return new timeSpan(E(hours).mul(36e5))
  }
  static fromMinutes(minutes) {
    return new timeSpan(E(minutes).mul(6e4))
  }
  static fromSeconds(seconds) {
    return new timeSpan(E(seconds).mul(1e3))
  }
  static fromMilliseconds(milliseconds) {
    return new TimeSpan(milliseconds)
  }
  copyFrom(other) {
    this._ms = other._ms
  }
  get totalYears() {
    return this._ms.div(31536e6);
  }
  get totalDays() {
    return this._ms.div(864e5);
  }
  get totalHours() {
    return this._ms.div(36e5);
  }
  get totalMinutes() {
    return this._ms.div(6e4);
  }
  get totalSeconds() {
    return this._ms.div(1e3);
  }
  get totalMilliseconds() {
    return this._ms;
  }
  get years() {
    return ExpantaNum.floor(this.totalYears);
  }
  get days() {
    return ExpantaNum.floor(this.totalDays.sub(this.totalDays.div(365).floor().times(365)));
  }
  get hours() {
    return ExpantaNum.floor(this.totalHours.sub(this.totalHours.div(24).floor().times(24)));
  }
  get minutes() {
    return ExpantaNum.floor(this.totalMinutes.sub(this.totalMinutes.div(60).floor().times(60)));
  }
  get seconds() {
    return ExpantaNum.floor(this.totalSeconds.sub(this.totalSeconds.div(60).floor().times(60)));
  }
  get milliseconds() {
    return ExpantaNum.floor(this.totalMilliseconds.sub(this.totalMilliseconds.div(1e3).floor().times(1e3)));
  }
  toString() {
    if (this.totalMilliseconds.eq(0)) return '0毫秒'
    let string = ''
    if (this.years.neq(0)) string = string + (formatWhole(this.years) + '年')
    if (this.days.neq(0) && this.years.lt(4e14)) string = string + (formatWhole(this.days) + '天')
    if (this.hours.neq(0) && this.years.lt(4e12)) string = string + (formatWhole(this.hours) + '时')
    if (this.minutes.neq(0) && this.years.lt(5e10)) string = string + (formatWhole(this.minutes) + '分')
    if (this.seconds.neq(0) && this.years.lt(1e9)) string = string + (formatWhole(this.seconds) + '秒')
    if (this.milliseconds.neq(0) &&  this.years.lt(4e7)) string = string + (formatWhole(this.milliseconds) + '毫秒')
    return string
  }
}