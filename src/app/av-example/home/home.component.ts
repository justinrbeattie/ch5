import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  levels = [
    {
      name: 'First Floor', spaces: [
        { name: 'Kitchen', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './kitchen.jpg' },
        { name: 'Dining', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './patio.jpg' },
        { name: 'Living Room', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './lounge.jpg' },
        { name: 'Patio', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './patio.jpg' },
        { name: 'Guest Bathroom', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './lounge.jpg' },
      ]
    },
    {
      name: 'Second Floor', spaces: [
        { name: 'Guest Bedroom 1', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './lounge.jpg' },
        { name: 'Ensuite 1', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './lounge.jpg' },
        { name: 'Guest Bedroom 2', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './lounge.jpg' },
        { name: 'Ensuite 2', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './lounge.jpg' },
        { name: 'Deck', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './lounge.jpg' },
      ]
    },
    {
      name: 'Third Floor', spaces: [
        { name: 'Master Bedroom', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './lounge.jpg' },
        { name: 'Master Enruite', description: 'Lights are on. Sonos is playing. Shades are up.', temperature: '25°', image: './lounge.jpg' },
      ]
    },
  ]

}
