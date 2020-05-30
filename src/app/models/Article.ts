export class Article {
  title: string;
  desc: string;
  date: string;
  img:string;
  link:string;
  id:number;

  constructor(title:string, desc:string,date:string,img:string,link:string,id:number) {
    this.id =id
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.img = img;
    this.link = link
  }
}
