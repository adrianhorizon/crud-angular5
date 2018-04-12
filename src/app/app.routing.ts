// definir la rutas de la app
import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question/question-list.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { SignupScreenComponent } from './signup/signup-screen.component';
import { QUESTION_ROUTES } from './question/question.routing';

// esto va contener nuestras rutas los va a contener como un objet de javascript path
const APP_ROUTES: Routes = [
    // machear la rutas y con matchpatch que se inicialize siempre esa y esto es un array de rutas
 { path: '', component: QuestionListComponent, pathMatch: 'full' },
 { path: 'signin', component: SigninScreenComponent },
 { path: 'signup', component: SignupScreenComponent },
 { path: 'questions', children: QUESTION_ROUTES }
];

// question -->listado
//

// vamos a definir la rutas que le vamos a pasar
// este el sistema de rutas desde la raiz
export const Routing = RouterModule.forRoot(APP_ROUTES);
