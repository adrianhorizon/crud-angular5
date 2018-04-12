import { Component } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { Question } from './question.model';
import icons from './icons';
import { QuestionService } from './question.service';
import { Router } from '@angular/router';

@Component ({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.css'],
    providers: [QuestionService]
})

export class QuestionFormComponent {
    // recibe array de objetos
    icons: object[] = icons;
    // no queremos declarar Icon sea tipo

    constructor(
        private questionService: QuestionService,
        private router: Router
    ) { }

    getIconVersion(icon: any) {
        let version;
        // declaramos para imprima iconos con el texto como aws
        if (icon.versions.font.includes('plain-wordmark')) {
            version = 'plain-wordmark';
        } else {
            // para el primer elemento que encuentre
            version = icon.versions.font[0];
        }
        return version;
    }

    onSubmit(form: NgForm) {
        // Creamos un nuevo objeto y form value para importar del name de form.html
        const q = new Question(
            form.value.title,
            form.value.description,
            new Date(),
            form.value.icon
        );
        this.questionService.addQuestion(q)
        // suscribirnos para el error o exito un metodo con dos funciones
        .subscribe(
        ({ _id }) => this.router.navigate(['questions', _id]),
        error => console.log(error)
        );
        form.resetForm();
    }
}
