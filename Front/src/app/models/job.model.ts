export class Job {

    constructor(
        public Title: string,
        public Place: string,
        public Enterprise?: string,
        public Salary?: string,
        public Contract?: string,
        public Description?: string, 
        public Url?: string,
        public Seniority?: string,
        public Skills?: Array<any>,
        public Candidates?: Array<any>
    ){  }

}