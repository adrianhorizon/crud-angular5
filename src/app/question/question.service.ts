import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import * as urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class QuestionService {
    private questionUrl: string;

    constructor (private http: Http) {
        this.questionUrl = urljoin(environment.apiUrl, 'questions');
    }

    // accedemos a api/question
    getQuestions(): Promise<void | Question[]> {
        return this.http.get(this.questionUrl)
                .toPromise()
                .then(response => response.json() as Question[])
                .catch(this.handleError);
    }

    // accedemos a api/question/id
    getQuestion(id): Promise<void | Question> {
        const url = urljoin(this.questionUrl, id);
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as Question)
                .catch(this.handleError);
    }

    addQuestion(question: Question) {
        // generar un string de la pregunta
        const body = JSON.stringify(question);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.questionUrl, body, { headers })
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    addAnswer(answer: Answer) {
        // generar un string de la pregunta
        const a = {
            description: answer.description,
            question: {
                _id: answer.question._id
            }
        };
        const body = JSON.stringify(answer);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const url = urljoin(this.questionUrl, answer.question._id.toString(), 'answers');

        // api/questions/id/answers esta la ruta que construimos
        return this.http.post(url, body, { headers })
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
      }
}
