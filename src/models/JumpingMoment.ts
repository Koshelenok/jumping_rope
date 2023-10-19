class JumpingMoment {
  public duration: number;
  constructor(public type: string, public start: Date, public end: Date) {
    this.duration = end.getTime() - start.getTime();
  }
  minutes(): number {
    return this.duration / 1000 / 60;
  }
  isBetween(date: Date): boolean {
    return (
      date.getTime() >= this.start.getTime() &&
      date.getTime() < this.end.getTime()
    );
  }
  isActive(): boolean {
    return this.isBetween(new Date());
  }
  getPercentByDate(date: Date): number {
    const totalDuration = this.end.getTime() - this.start.getTime();
    const currentDuration = date.getTime() - this.start.getTime();
    if (currentDuration < 0) {
      return 0;
    }
    return Math.floor((currentDuration / totalDuration) * 100);
  }
  getCurrentPercent(): number {
    return this.getPercentByDate(new Date());
  }
}

export default JumpingMoment;
