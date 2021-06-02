import { GoogleEvent } from './google-event.model';

describe('Event', () => {
  it('should create an instance', () => {
    expect(new GoogleEvent("123")).toBeTruthy();
  });
});
