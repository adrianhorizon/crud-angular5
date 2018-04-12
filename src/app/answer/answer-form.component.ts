import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from './answer.model';
import { Question } from '../question/question.model';
import { User } from '../auth/user.model';
import { QuestionService } from '../question/question.service';
import SweetScroll from 'sweet-scroll';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})

export class AnswerFormComponent {
  // input propiedad que se la va pasar
  @Input() question: Question;
  sweetScroll: SweetScroll;

  constructor(private questionService: QuestionService) {
    const scroller = new SweetScroll({/* some options */}, '#title');
  }

  /*para enviar un dato de un formulario*/
  onSubmit(form: NgForm) {
    const answer = new Answer(
      form.value.description,
      this.question
    );
    this.questionService
        .addAnswer(answer)
        .subscribe(
          // asignarle array una nueva respuesta insertamos en la pregunta y lo agrega primero unshift
          a =>  {
            this.question.answers.unshift(a);
            this.sweetScroll.to('#title');
          },
          error => console.log(error)
        );
    // borrar el input del formulario reset()
    form.reset();
  }
}
