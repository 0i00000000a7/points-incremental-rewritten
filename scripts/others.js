class formatTime {
  constructor(miliseconds) {
    this._ms = E(miliseconds)
  }
  static fromYears(years) {
    return new formatTime(E(years).mul(31536e6))
  }
  static fromDays(days) {
    return new formatTime(E(days).mul(864e5))
  }
  static fromHours(hours) {
    return new formatTime(E(hours).mul(36e5))
  }
  static fromMinutes(minutes) {
    return new formatTime(E(minutes).mul(6e4))
  }
  static fromSeconds(seconds) {
    return new formatTime(E(seconds).mul(1e3))
  }
  static fromMilliseconds(milliseconds) {
    return new formatTime(milliseconds)
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
  toJSON() {
    return this.toString()
  }
}
function chunkArrayIntoGroupsOfTen(arr) {  
    const chunkSize = 10;  
    const result = [];  
    for (let i in arr) {
      arr[i].id = Number(i)+1
    }
    for (let i = 0; i < arr.length; i += chunkSize) {  
        // 使用slice方法获取当前组的元素  
        const chunk = arr.slice(i, i + chunkSize);  
        result.push(chunk);  
    }  
    for (let i in result) {
      result[i].id = i
    }
    return result;  
}  

function formatGain(a,e,res="") {
    const g = ExpantaNum.add(a,e.div(30))
    const DT = ExpantaNum("10^^6")

    if (g.neq(a)) {
        if (a.gte(DT)) {
            var oom = E(g).slog(10).sub(E(a).slog(10)).mul(30)
            if (oom.gte(1e-3)) return oom.format() + " 数量级^^2"
        }

        if (a.gte('ee100')) {
            var tower = E(a).slog(10).sub(1.3010299956639813).floor();
    
            var oom = E(g).iteratedlog(10,tower).sub(E(a).iteratedlog(10,tower)).mul(30), rated = false;
    
            if (oom.gte(1)) rated = true
            else if (tower > 2) {
                tower--
                oom = E(g).iteratedlog(10,tower).sub(E(a).iteratedlog(10,tower)).mul(30)
                if (oom.gte(1)) rated = true
            }
    
            if (rated) return oom.format() + " 数量级^"+tower
        }
    
        if (a.gte(1e100)) {
            const oom = g.div(a).log10().mul(30)
            if (oom.gte(1)) return oom.format() + " 数量级"
        }
    }

    return format(e) + res
}

Array.prototype.toBitmask = function() {
  return this.reduce((prev, val) => prev | (1 << val), 0);
};