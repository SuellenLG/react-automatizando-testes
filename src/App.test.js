import React from "react";
import { render, screen } from '@testing-library/react';
import App from "./App"

describe('Componente principal', () => {

    describe('Quando abro o app do banco', () => {
        render(<App />);
        it('o nome é exibido', () => {
            expect(screen.getByText('ByteBank')).toBeInTheDocument()
        });

        it('o saldo é exibido', () => {
            render(<App />);
            expect(screen.getByText('Saldo:')).toBeInTheDocument()
        });

        it('o botão de realizar transação é exibido', () => {
            render(<App />);
            expect(screen.getByText('Realizar operação')).toBeInTheDocument()
        });
    })

    
})






