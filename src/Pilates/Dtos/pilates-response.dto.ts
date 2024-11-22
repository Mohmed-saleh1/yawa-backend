export class PilatesResponseDto {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  maxAttendane: number;

  constructor(pilates: any) {
    this.id = pilates._id?.toString();
    this.name = pilates.name;
    this.date = pilates.date;
    this.time = pilates.time;
    this.description = pilates.description;
    this.maxAttendane = pilates.maxAttendane;
  }
}
