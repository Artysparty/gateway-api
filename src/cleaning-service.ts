import express from 'express'

interface Cleaning {
  roomsToClean: string[];
  cleanedRooms: string[];
  isCleaningAvailable: boolean;
}
const CleaningMock: Cleaning = {
  roomsToClean: ['1', '3', '55', '12'],
  cleanedRooms: ['2', '54', '56', '11'],
  isCleaningAvailable: true,
}

class CleaningService {
  private cleaning: Cleaning;

  constructor() {
    this.cleaning = CleaningMock;
  }

  public addRoomToClean(roomId: string): void {
    this.cleaning.roomsToClean.push(roomId)
  }

  public getCleanedRooms(): string[]{
    return this.cleaning.cleanedRooms;
  }
}

const app = express();

const service = new CleaningService();

app.get('/cleaned-rooms', (req, res) => {
  res.json(service.getCleanedRooms());
});

app.get('clean-my-room/:roomId', (req, res) => {
  service.addRoomToClean(req.params.roomId)
})

app.listen(5003, () => {
  console.log('Server listening port 5003');
});
