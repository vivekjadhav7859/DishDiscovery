import { Component } from '@angular/core';

@Component({
  selector: 'app-herosection',
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.scss'],
})
export class HerosectionComponent {
  images = [
    {
      imgSrc:
        'https://images.unsplash.com/photo-1486485764572-92b96f21882a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGJsb2d8ZW58MHx8MHx8fDA%3D',
      imgAlt: 'image',
    },
    {
      imgSrc:
        'https://images.pexels.com/photos/19808760/pexels-photo-19808760/free-photo-of-pizza-with-egg-benedict-and-arugula.jpeg?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image2',
    },
    {
      imgSrc:
        'https://images.pexels.com/photos/19786212/pexels-photo-19786212/free-photo-of-table-full-of-fast-food-and-beer.jpeg?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image3',
    },
    {
      imgSrc:
        'https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image4',
    },
    {
      imgSrc:
        'https://images.pexels.com/photos/3763824/pexels-photo-3763824.jpeg?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image5',
    },
    {
      imgSrc:
        'https://images.pexels.com/photos/3763826/pexels-photo-3763826.jpeg?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image5',
    },
    {
      imgSrc:
        'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imgAlt: 'image6',
    },
    {
      imgSrc:
        'https://images.unsplash.com/photo-1619592982310-7b7d51e4207f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imgAlt: 'image7',
    },
    {
      imgSrc:
        'https://images.unsplash.com/photo-1528198622811-0842b4e50787?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imgAlt: 'image8',
    },
    {
      imgSrc:
        'https://images.pexels.com/photos/3843225/pexels-photo-3843225.jpeg?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image9',
    },
    {
      imgSrc:
        'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZCUyMGJsb2d8ZW58MHx8MHx8fDA%3D',
      imgAlt: 'image10',
    },
  ];
  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
