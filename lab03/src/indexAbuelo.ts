import * as component from './components/indexPadre';
import Workers, { Attribute } from './components/workers/workers';
import { workers } from './data/data';

class AppContainer extends HTMLElement {
    workers: Workers[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const workersPair = workers.filter(worker => worker.id % 2 === 0);

        workersPair.forEach(worker => {
            const workerPerson = document.createElement('my-workers') as Workers;

            workerPerson.setAttribute(Attribute.image, worker.image);
            workerPerson.setAttribute(Attribute.name, worker.name);
            workerPerson.setAttribute(Attribute.uid, String(worker.id));
            workerPerson.setAttribute(Attribute.age, String(worker.age));
            workerPerson.setAttribute(Attribute.gender, worker.gender);
            workerPerson.setAttribute(Attribute.area, worker.jobDetails.area);
            workerPerson.setAttribute(Attribute.position, worker.jobDetails.position);
            workerPerson.setAttribute(Attribute.timeInCompany, String(worker.jobDetails.timeInCompany));
            workerPerson.setAttribute(Attribute.experience, String(worker.jobDetails.experience));

            this.workers.push(workerPerson);
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `<h1>Workers</h1>`;
            this.workers.forEach(worker => {
                this.shadowRoot?.appendChild(worker);
            });
        }
    }
}

customElements.define('app-container', AppContainer);