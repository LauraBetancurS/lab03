

export enum Attribute {
    "image" = "image",
    "name" = "name",
    "uid" = "uid",
    "age" = "age",
    "gender" = "gender",
    "area" = "area",
    "position" = "position",
    "timeInCompany" = "timeInCompany",
    "experience" = "experience"
}

class Workers extends HTMLElement {
    image?: string;
    name?: string;
    uid?: number;
    age?: number;
    gender?: string;
    area?: string;
    position?: string;
    timeInCompany?: number;
    experience?: number;

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            image: null,
            name: null,
            uid: null,
            age: null,
            gender: null,
            area: null,
            position: null,
            timeInCompany: null,
            experience: null
        };
        return Object.keys(attrs) as Attribute[];
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        if (propName === Attribute.uid || propName === Attribute.age || propName === Attribute.timeInCompany || propName === Attribute.experience) {
            this[propName] = newValue ? Number(newValue) : undefined;
        } else {
            this[propName] = newValue;
        }
        this.render();
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <section>
                    <img src="${this.image}" alt="${this.name}">
                    <h2>${this.name}</h2>
                    <p>ID: ${this.uid}</p>
                    <p>Age: ${this.age}</p>
                    <p>Gender: ${this.gender}</p>
                    <p>Area: ${this.area}</p>
                    <p>Position: ${this.position}</p>
                    <p>Time in Company: ${this.timeInCompany} years</p>
                    <p>Experience: ${this.experience} years</p>
                </section>
            `;
        }
    }
}

customElements.define("my-workers", Workers);
export default Workers;
