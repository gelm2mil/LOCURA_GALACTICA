
/* =========================================
   LOCURA GALÁCTICA
   MOTOR PRINCIPAL DEL UNIVERSO
   BY GELM
========================================= */

"use strict";

// CONFIGURACIÓN DEL UNIVERSO

const LOCURA_GALACTICA = {
    nombre: "LOCURA GALÁCTICA",
    version: "0.2.0",
    estado: "En desarrollo"
};

console.log("Universo preparado:", LOCURA_GALACTICA.nombre);


// =========================================
// SISTEMA DE ESTRELLAS
// =========================================

class CampoEstelar {

    constructor() {
        this.contenedor = document.getElementById("universo");

        if (!this.contenedor) return;

        this.canvas = document.createElement("canvas");
        this.canvas.id = "campo-estelar";

        this.ctx = this.canvas.getContext("2d");

        if (!this.ctx) return;

        this.estrellas = [];
        this.cantidad = 110;
        this.ultimoFrame = 0;

        this.movimientoReducido = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        this.contenedor.prepend(this.canvas);

        this.ajustarPantalla();
        this.crearEstrellas();

        window.addEventListener("resize", () => {
            this.ajustarPantalla();
            this.crearEstrellas();
        });

        this.dibujar(0);
    }

    ajustarPantalla() {
        this.ancho = this.contenedor.clientWidth;
        this.alto = this.contenedor.clientHeight;

        const escala = Math.min(window.devicePixelRatio || 1, 1.5);

        this.canvas.width = this.ancho * escala;
        this.canvas.height = this.alto * escala;

        this.canvas.style.width = this.ancho + "px";
        this.canvas.style.height = this.alto + "px";

        this.ctx.setTransform(escala, 0, 0, escala, 0, 0);
    }

    crearEstrellas() {
        this.estrellas = [];

        for (let i = 0; i < this.cantidad; i++) {

            const tipo = Math.random();

            let color = "255,255,255";

            if (tipo > 0.88) {
                color = "0,207,255";
            } else if (tipo > 0.76) {
                color = "160,105,255";
            }

            this.estrellas.push({
                x: Math.random() * this.ancho,
                y: Math.random() * this.alto,
                radio: Math.random() * 1.1 + 0.25,
                brillo: Math.random() * 0.45 + 0.25,
                velocidad: Math.random() * 0.0008 + 0.0002,
                fase: Math.random() * Math.PI * 2,
                color: color
            });
        }
    }

    dibujar(tiempo) {

        requestAnimationFrame((t) => this.dibujar(t));

        if (
            !this.movimientoReducido &&
            tiempo - this.ultimoFrame < 33
        ) {
            return;
        }

        this.ultimoFrame = tiempo;

        this.ctx.clearRect(0, 0, this.ancho, this.alto);

        this.estrellas.forEach(estrella => {

            let opacidad = estrella.brillo;

            if (!this.movimientoReducido) {
                opacidad += Math.sin(
                    tiempo * estrella.velocidad + estrella.fase
                ) * 0.18;
            }

            opacidad = Math.max(0.08, Math.min(0.85, opacidad));

            this.ctx.beginPath();

            this.ctx.arc(
                estrella.x,
                estrella.y,
                estrella.radio,
                0,
                Math.PI * 2
            );

            this.ctx.fillStyle =
                `rgba(${estrella.color}, ${opacidad})`;

            this.ctx.fill();
        });
    }
}


// =========================================
// INICIO DEL UNIVERSO
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    window.campoEstelar = new CampoEstelar();

    console.log("Campo estelar iniciado correctamente.");

});
