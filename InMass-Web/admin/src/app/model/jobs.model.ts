export class Job{
    constructor(
        public _id?:string,
        public j_title:string ='',
        public j_post?:string,
        public j_des:string ='',
        public j_company:string ='',
        public j_location:string ='',
        public j_requirement:string ='',
        public j_keywords:string ='',
    ){}
}