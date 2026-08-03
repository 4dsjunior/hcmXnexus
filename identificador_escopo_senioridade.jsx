<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Identificador de Escopo e Senioridade</title>
    <style>
        :root {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        body {
            background-color: #fafafa;
            margin: 0;
            padding: 40px 20px;
            min-height: 100vh;
            box-sizing: border-box;
        }
        .header {
            max-width: 700px;
            margin: 0 auto 40px;
            text-align: center;
        }
        .title {
            font-size: 32px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 8px;
            letter-spacing: -0.5px;
        }
        .subtitle {
            font-size: 14px;
            color: #666;
            margin: 0;
        }
        .card {
            max-width: 700px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            box-sizing: border-box;
        }
        .employee-info {
            padding-bottom: 32px;
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 32px;
        }
        .employee-name {
            font-size: 20px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 8px;
        }
        .employee-details {
            font-size: 13px;
            color: #666;
            margin: 4px 0;
        }
        .section {
            margin-bottom: 40px;
        }
        .section-title {
            font-size: 14px;
            font-weight: 600;
            color: #1a1a1a;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0 0 20px;
        }
        .questions-group {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 12px;
        }
        .radio-label {
            display: flex;
            align-items: flex-start;
            cursor: pointer;
            gap: 12px;
            padding: 12px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        }
        .radio-label:hover {
            background-color: #f3f4f6;
        }
        .radio-input {
            margin-top: 3px;
            cursor: pointer;
            accent-color: #2563eb;
        }
        .radio-text {
            font-size: 14px;
            color: #333;
            line-height: 1.5;
        }
        .result-check {
            font-size: 13px;
            color: #059669;
            font-weight: 500;
            margin: 8px 0 0;
            display: none;
        }
        .navigation {
            display: flex;
            gap: 12px;
            margin-top: 40px;
            padding-top: 32px;
            border-top: 1px solid #e5e5e5;
        }
        .final-buttons-group {
            display: none;
            gap: 12px;
            flex: 1;
        }
        .btn {
            flex: 1;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 500;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .btn-primary { background-color: #2563eb; color: #fff; }
        .btn-secondary { background-color: #e5e5e5; color: #333; }
        .btn-success { background-color: #059669; color: #fff; }
        .btn-download { background-color: #7c3aed; color: #fff; }
    </style>
</head>
<body>

    <div class="header">
        <h1 class="title">Identificador de Escopo e Senioridade</h1>
        <p class="subtitle" id="counter">1 de X</p>
    </div>

    <div class="card">
        <div class="employee-info">
            <h2 class="employee-name" id="emp-name">Nome do Funcionário</h2>
            <p class="employee-details" id="emp-email">email</p>
            <p class="employee-details" id="emp-matricula">Matrícula: 000</p>
        </div>

        <div class="section">
            <h3 class="section-title">Passo 1: Identifique a Posição (Escopo da Função)</h3>
            <div class="questions-group" id="scope-questions"></div>
            <p class="result-check" id="scope-check">✓ Escopo identificado</p>
        </div>

        <div class="section">
            <h3 class="section-title">Passo 2: Identifique o Nível de Senioridade</h3>
            <div class="questions-group" id="seniority-questions"></div>
            <p class="result-check" id="seniority-check">✓ Senioridade identificada</p>
        </div>

        <div class="navigation">
            <button class="btn btn-secondary" id="btn-prev" onclick="handlePrevious()">← Anterior</button>
            <button class="btn btn-primary" id="btn-next" onclick="handleNext()">Próximo →</button>
            
            <div class="final-buttons-group" id="final-buttons">
                <button class="btn btn-success" id="btn-finish" onclick="handleFinish()">✓ Finalizar</button>
                <button class="btn btn-download" id="btn-download" onclick="downloadJSON()">⬇ Baixar JSON</button>
            </div>
        </div>
    </div>

    <script>
        // Dados originais
        const employees = [
            { name: 'WELINGTON SIMOES DA SILVA', email: 'welington@grupoemec.com.br', matricula: '2747' },
            { name: 'ANA LUIZA GONCALVES SIMOES', email: 'ana.luiza@grupoemec.com.br', matricula: '7585' },
            { name: 'MARCOS PEREIRA DOS SANTOS', email: 'marcos.pereira@grupoemec.com.br', matricula: '7322' },
            { name: 'CHARLES DE SOUZA MACHADO', email: 'charles@grupoemec.com.br', matricula: '7834' }
        ];

        const scopeQuestions = [
            { id: 'scope_1', question: 'O trabalho é predominantemente braçal, de suporte básico, movimentação física ou limpeza/organização de rotina?', answer: 'AUXILIAR' },
            { id: 'scope_2', question: 'Ele opera sistemas, realiza lançamentos de dados, controle de planilhas de rotina ou atendimento padronizado?', answer: 'ASSISTENTE' },
            { id: 'scope_3', question: 'Ele analisa relatórios/dados, interpreta regras do negócio, toma decisões técnicas, resolve problemas sem receita pronta ou cria soluções?', answer: 'ANALISTA' },
            { id: 'scope_4', question: 'Ele lidera pessoas diretamente, distribui as tarefas diárias da equipe, controla horários, escalas, produtividade e garante o cumprimento de prazos?', answer: 'SUPERVISOR' },
            { id: 'scope_5', question: 'Ele é responsável pela governança geral do setor, orçamentos, definição de padrões, capacidade produtiva e alinhamento com a diretoria?', answer: 'COORDENADOR' }
        ];

        const seniorityQuestions = [
            { id: 'senior_1', question: 'Depende de orientação e supervisão frequente para saber o que e como fazer? Está em fase de aprendizado e adaptação às rotinas padrão?', answer: 'NÍVEL I' },
            { id: 'senior_2', question: 'Domina a rotina diária padronizada e executa suas tarefas com autonomia sem precisar de acompanhamento passo a passo?', answer: 'NÍVEL II' },
            { id: 'senior_3', question: 'Possui autonomia para resolver problemas complexos, contornar exceções da rotina, gerenciar imprevistos e atuar de forma independente?', answer: 'NÍVEL III' },
            { id: 'senior_4', question: 'É a referência técnica ou tática do setor. Além de resolver casos de extrema complexidade, audita processos, orienta, capacita e ensina os colegas do time?', answer: 'NÍVEL IV' }
        ];

        // Estado da aplicação (substituindo o useState do React)
        let currentEmployee = 0;
        let answers = {};

        // Inicializa o objeto de respostas vazio
        employees.forEach(emp => {
            answers[emp.email] = {};
        });

        // Função de renderização principal (Atualiza a interface)
        function render() {
            const employee = employees[currentEmployee];
            const employeeAnswers = answers[employee.email];

            // 1. Atualizar Textos
            document.getElementById('counter').innerText = `${currentEmployee + 1} de ${employees.length}`;
            document.getElementById('emp-name').innerText = employee.name;
            document.getElementById('emp-email').innerText = employee.email;
            document.getElementById('emp-matricula').innerText = `Matrícula: ${employee.matricula}`;

            // 2. Renderizar Perguntas de Escopo
            const scopeContainer = document.getElementById('scope-questions');
            scopeContainer.innerHTML = scopeQuestions.map(q => `
                <label class="radio-label">
                    <input type="radio" name="scope" value="${q.id}" class="radio-input"
                           ${employeeAnswers[q.id] === q.answer ? 'checked' : ''}
                           onchange="handleAnswer('${q.id}', '${q.answer}')">
                    <span class="radio-text">${q.question}</span>
                </label>
            `).join('');

            // 3. Renderizar Perguntas de Senioridade
            const seniorityContainer = document.getElementById('seniority-questions');
            seniorityContainer.innerHTML = seniorityQuestions.map(q => `
                <label class="radio-label">
                    <input type="radio" name="seniority" value="${q.id}" class="radio-input"
                           ${employeeAnswers[q.id] === q.answer ? 'checked' : ''}
                           onchange="handleAnswer('${q.id}', '${q.answer}')">
                    <span class="radio-text">${q.question}</span>
                </label>
            `).join('');

            updateValidationsAndButtons();
        }

        // Função para atualizar as regras de negócio dos botões
        function updateValidationsAndButtons() {
            const employee = employees[currentEmployee];
            const employeeAnswers = answers[employee.email];

            const hasScope = scopeQuestions.some(q => employeeAnswers[q.id]);
            const hasSeniority = seniorityQuestions.some(q => employeeAnswers[q.id]);
            
            document.getElementById('scope-check').style.display = hasScope ? 'block' : 'none';
            document.getElementById('seniority-check').style.display = hasSeniority ? 'block' : 'none';

            const isEmployeeComplete = hasScope && hasSeniority;
            const isLastEmployee = currentEmployee === employees.length - 1;

            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');
            const finalButtons = document.getElementById('final-buttons');
            const btnFinish = document.getElementById('btn-finish');
            const btnDownload = document.getElementById('btn-download');

            // Controle do botão Anterior
            btnPrev.disabled = currentEmployee === 0;

            if (!isLastEmployee) {
                // Modo Navegação Normal
                btnNext.style.display = 'block';
                finalButtons.style.display = 'none';
                btnNext.disabled = !isEmployeeComplete;
            } else {
                // Modo Último Funcionário
                btnNext.style.display = 'none';
                finalButtons.style.display = 'flex';

                const allComplete = employees.every(emp => {
                    const ans = answers[emp.email];
                    const s = scopeQuestions.some(q => ans[q.id]);
                    const sen = seniorityQuestions.some(q => ans[q.id]);
                    return s && sen;
                });

                btnFinish.disabled = !allComplete;
                btnDownload.disabled = !allComplete;
            }
        }

        // Salva a resposta no "estado"
        window.handleAnswer = function(questionId, answer) {
            const employee = employees[currentEmployee];
            // No caso de rádio, as outras opções da mesma categoria devem ser limpas daquele funcionário
            const isScopeQuestion = scopeQuestions.some(q => q.id === questionId);
            const questionGroup = isScopeQuestion ? scopeQuestions : seniorityQuestions;
            
            // Remove as respostas antigas deste grupo
            questionGroup.forEach(q => {
                delete answers[employee.email][q.id];
            });

            // Seta a nova resposta
            answers[employee.email][questionId] = answer;
            
            // Re-avalia os botões e checks (sem precisar re-renderizar todo o HTML das perguntas)
            updateValidationsAndButtons();
        };

        window.handleNext = function() {
            if (currentEmployee < employees.length - 1) {
                currentEmployee++;
                render();
            }
        };

        window.handlePrevious = function() {
            if (currentEmployee > 0) {
                currentEmployee--;
                render();
            }
        };

        // Geração do Objeto de Resumo
        function getSummaryData() {
            return employees.map(emp => {
                const empAnswers = answers[emp.email];
                const scope = scopeQuestions.find(q => empAnswers[q.id])?.answer || '—';
                const seniority = seniorityQuestions.find(q => empAnswers[q.id])?.answer || '—';
                return {
                    nome: emp.name,
                    email: emp.email,
                    matricula: emp.matricula,
                    escopo: scope,
                    senioridade: seniority
                };
            });
        }

        window.handleFinish = function() {
            const summary = getSummaryData();
            alert('Resumo gerado:\n\n' + summary.map(s => `${s.nome}\nEscopo: ${s.escopo}\nSenioridade: ${s.senioridade}`).join('\n\n'));
        };

        window.downloadJSON = function() {
            const summary = getSummaryData();
            const dataStr = JSON.stringify(summary, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `escopo_senioridade_${new Date().toISOString().split('T')[0]}.json`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        };

        // Renderiza o aplicativo pela primeira vez ao carregar a tela
        render();
    </script>
</body>
</html>