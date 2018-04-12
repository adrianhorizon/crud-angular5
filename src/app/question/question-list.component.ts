import { Component, OnInit } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component ({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css'],
    providers: [QuestionService]
})

export class QuestionListComponent implements OnInit {
    constructor(private questionService: QuestionService) { }

    // question va a ser un array que repite 10 posiciones d ela misma pregunta
    questions: Question[];
    loading = true;

    ngOnInit() {
        this.questionService
        .getQuestions()
        .then((questions: Question[]) => {
            this.questions = questions;
            this.loading = false;
        });
    }
}
