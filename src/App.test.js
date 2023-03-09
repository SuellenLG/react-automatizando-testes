import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import App, { calcularNovoSaldo } from "./App"

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

    describe('Quando eu realizo uma transação', () => {
        it('que é um saque o valor vai diminuir', () => {
            const valores = {
                transacao: 'saque',
                valor: 50
            }
            const saldo = 150
            const novoSaldo = calcularNovoSaldo(valores, saldo)

            expect(novoSaldo).toBe(100);
        });

        it('que é um deposito o valor vai diminuir', () => {
            const valores = {
                transacao: 'deposito',
                valor: 50
            }
            const saldo = 150
            const novoSaldo = calcularNovoSaldo(valores, saldo)

            expect(novoSaldo).toBe(200);
        });

        it('que o saque é maior que o saldo o valor é negativo', () => {
            const valores = {
                transacao: 'saque',
                valor: 200
            }
            const saldo = 150
            const novoSaldo = calcularNovoSaldo(valores, saldo)

            expect(novoSaldo).toBe(-50);
        });

        it('que é um saque, a transação deve ser relaizada', () => {
            const { getByText, getByTestId, getByLabelText } = render(<App />)
            const saldo = getByText('R$ 1000');
            const transacao = getByLabelText('Saque');
            const valor = getByTestId('valor');
            const botaoTransacao = getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000')

            fireEvent.click(transacao, {target: {value: 'saque'}});
            fireEvent.change(valor, {target: {value: '10'}});
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 990');
        });

        it('que é um saque, a transação não deve ser relaizada', () => {
            const { getByText, getByTestId, getByLabelText } = render(<App />)
            const saldo = getByText('R$ 1000');
            const transacao = getByLabelText('Saque');
            const valor = getByTestId('valor');
            const botaoTransacao = getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000')

            fireEvent.click(transacao, {target: {value: 'saque'}});
            fireEvent.change(valor, {target: {value: '1010'}});
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ -10');
        });
    })
})
