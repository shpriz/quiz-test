import { Result, SectionScore, DetailedAnswer } from '../models/index.js';
import ExcelJS from 'exceljs';

function calculateOverallResult(totalScore) {
  if (totalScore >= 99) {
    return 'Очень плохой уровень осуществления гигиены полости рта, оказания стоматологической помощи и поддержания здорового образа жизни людей, проживающих в психоневрологических интернатах, в рамках сестринского ухода';
  } else if (totalScore >= 83) {
    return 'Плохой уровень осуществления гигиены полости рта, оказания стоматологической помощи и поддержания здорового образа жизни людей, проживающих в психоневрологических интернатах, в рамках сестринского ухода';
  } else if (totalScore >= 67) {
    return 'Неудовлетворительный уровень осуществления гигиены полости рта, оказания стоматологической помощи и поддержания здорового образа жизни людей, проживающих в психоневрологических интернатах, в рамках сестринского ухода';
  } else if (totalScore >= 51) {
    return 'Удовлетворительный уровень осуществления гигиены полости рта, оказания стоматологической помощи и поддержания здорового образа жизни людей, проживающих в психоневрологических интернатах, в рамках сестринского ухода';
  } else if (totalScore >= 35) {
    return 'Высокий уровень осуществления гигиены полости рта, оказания стоматологической помощи и поддержания здорового образа жизни людей, проживающих в психоневрологических интернатах, в рамках сестринского ухода';
  } else {
    return 'Недостаточно баллов для оценки';
  }
}

function calculateTestResult(testNumber, score) {
  const results = {
    1: {
      high: 'Высокий уровень организации гигиены полости рта у людей, проживающих в психоневрологических интернатах',
      satisfactory: 'Удовлетворительный уровень организации гигиены полости рта у людей, проживающих в психоневрологических интернатах',
      unsatisfactory: 'Неудовлетворительный уровень организации гигиены полости рта у людей, проживающих в психоневрологических интернатах',
      bad: 'Плохой уровень организации гигиены полости рта у людей, проживающих в психоневрологических интернатах',
      veryBad: 'Очень плохой уровень организации гигиены полости рта у людей, проживающих в психоневрологических интернатах'
    },
    2: {
      high: 'Высокий уровень организации оказания стоматологической помощи людям, проживающим в психоневрологических интернатах',
      satisfactory: 'Удовлетворительный уровень организации оказания стоматологической помощи людям, проживающим в психоневрологических интернатах',
      unsatisfactory: 'Неудовлетворительный уровень организации оказания стоматологической помощи людям, проживающим в психоневрологических интернатах',
      bad: 'Плохой уровень организации оказания стоматологической помощи людям, проживающим в психоневрологических интернатах',
      veryBad: 'Очень плохой уровень организации оказания стоматологической помощи людям, проживающим в психоневрологических интернатах'
    },
    3: {
      high: 'Высокий уровень организации здорового образа жизни у людей, проживающих в психоневрологических интернатах',
      satisfactory: 'Удовлетворительный уровень организации здорового образа жизни у людей, проживающих в психоневрологических интернатах',
      unsatisfactory: 'Неудовлетворительный уровень организации здорового образа жизни у людей, проживающих в психоневрологических интернатах',
      bad: 'Плохой уровень организации здорового образа жизни у людей, проживающих в психоневрологических интернатах',
      veryBad: 'Очень плохой уровень организации здорового образа жизни у людей, проживающих в психоневрологических интернатах'
    },
    4: {
      high: 'Высокий уровень организации сестринского ухода за людьми, проживающих в психоневрологических интернатах',
      satisfactory: 'Удовлетворительный уровень организации сестринского ухода за людьми, проживающих в психоневрологических интернатах',
      unsatisfactory: 'Неудовлетворительный уровень организации сестринского ухода за людьми, проживающих в психоневрологических интернатах',
      bad: 'Плохой уровень организации сестринского ухода за людьми, проживающих в психоневрологических интернатах',
      veryBad: 'Очень плохой уровень организации сестринского ухода за людьми, проживающих в психоневрологических интернатах'
    }
  };

  if (score >= 25) return results[testNumber].veryBad;
  if (score >= 21) return results[testNumber].bad;
  if (score >= 17) return results[testNumber].unsatisfactory;
  if (score >= 13) return results[testNumber].satisfactory;
  if (score >= 9) return results[testNumber].high;
  return 'Недостаточно баллов для оценки';
}

// Функция для получения заголовков колонок
function getColumns() {
  const columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Фамилия', key: 'lastName', width: 20 },
    { header: 'Имя', key: 'firstName', width: 20 },
    { header: 'Дата', key: 'date', width: 20 },
    { header: 'Общий балл', key: 'totalScore', width: 15 },
    { header: 'Общий результат', key: 'overallResult', width: 80 }
  ];

  // Block 1
  columns.push(
    { header: 'Блок 1 (балл)', key: 'block1Score', width: 15 },
    { header: 'Блок 1 (результат)', key: 'block1Result', width: 60 },
    { header: 'Вопрос 1.1', key: 'q1_1', width: 40 },
    { header: 'Ответ 1.1', key: 'a1_1', width: 40 },
    { header: 'Балл 1.1', key: 's1_1', width: 15 },
    { header: 'Вопрос 1.2', key: 'q1_2', width: 40 },
    { header: 'Ответ 1.2', key: 'a1_2', width: 40 },
    { header: 'Балл 1.2', key: 's1_2', width: 15 },
    { header: 'Вопрос 1.3', key: 'q1_3', width: 40 },
    { header: 'Ответ 1.3', key: 'a1_3', width: 40 },
    { header: 'Балл 1.3', key: 's1_3', width: 15 },
    { header: 'Вопрос 1.4', key: 'q1_4', width: 40 },
    { header: 'Ответ 1.4', key: 'a1_4', width: 40 },
    { header: 'Балл 1.4', key: 's1_4', width: 15 },
    { header: 'Вопрос 1.5', key: 'q1_5', width: 40 },
    { header: 'Ответ 1.5', key: 'a1_5', width: 40 },
    { header: 'Балл 1.5', key: 's1_5', width: 15 }
  );

  // Block 2
  columns.push(
    { header: 'Блок 2 (балл)', key: 'block2Score', width: 15 },
    { header: 'Блок 2 (результат)', key: 'block2Result', width: 60 },
    { header: 'Вопрос 2.1', key: 'q2_1', width: 40 },
    { header: 'Ответ 2.1', key: 'a2_1', width: 40 },
    { header: 'Балл 2.1', key: 's2_1', width: 15 },
    { header: 'Вопрос 2.2', key: 'q2_2', width: 40 },
    { header: 'Ответ 2.2', key: 'a2_2', width: 40 },
    { header: 'Балл 2.2', key: 's2_2', width: 15 },
    { header: 'Вопрос 2.3', key: 'q2_3', width: 40 },
    { header: 'Ответ 2.3', key: 'a2_3', width: 40 },
    { header: 'Балл 2.3', key: 's2_3', width: 15 },
    { header: 'Вопрос 2.4', key: 'q2_4', width: 40 },
    { header: 'Ответ 2.4', key: 'a2_4', width: 40 },
    { header: 'Балл 2.4', key: 's2_4', width: 15 },
    { header: 'Вопрос 2.5', key: 'q2_5', width: 40 },
    { header: 'Ответ 2.5', key: 'a2_5', width: 40 },
    { header: 'Балл 2.5', key: 's2_5', width: 15 }
  );

  // Block 3
  columns.push(
    { header: 'Блок 3 (балл)', key: 'block3Score', width: 15 },
    { header: 'Блок 3 (результат)', key: 'block3Result', width: 60 },
    { header: 'Вопрос 3.1', key: 'q3_1', width: 40 },
    { header: 'Ответ 3.1', key: 'a3_1', width: 40 },
    { header: 'Балл 3.1', key: 's3_1', width: 15 },
    { header: 'Вопрос 3.2', key: 'q3_2', width: 40 },
    { header: 'Ответ 3.2', key: 'a3_2', width: 40 },
    { header: 'Балл 3.2', key: 's3_2', width: 15 },
    { header: 'Вопрос 3.3', key: 'q3_3', width: 40 },
    { header: 'Ответ 3.3', key: 'a3_3', width: 40 },
    { header: 'Балл 3.3', key: 's3_3', width: 15 },
    { header: 'Вопрос 3.4', key: 'q3_4', width: 40 },
    { header: 'Ответ 3.4', key: 'a3_4', width: 40 },
    { header: 'Балл 3.4', key: 's3_4', width: 15 },
    { header: 'Вопрос 3.5', key: 'q3_5', width: 40 },
    { header: 'Ответ 3.5', key: 'a3_5', width: 40 },
    { header: 'Балл 3.5', key: 's3_5', width: 15 }
  );

  // Block 4
  columns.push(
    { header: 'Блок 4 (балл)', key: 'block4Score', width: 15 },
    { header: 'Блок 4 (результат)', key: 'block4Result', width: 60 },
    { header: 'Вопрос 4.1', key: 'q4_1', width: 40 },
    { header: 'Ответ 4.1', key: 'a4_1', width: 40 },
    { header: 'Балл 4.1', key: 's4_1', width: 15 },
    { header: 'Вопрос 4.2', key: 'q4_2', width: 40 },
    { header: 'Ответ 4.2', key: 'a4_2', width: 40 },
    { header: 'Балл 4.2', key: 's4_2', width: 15 },
    { header: 'Вопрос 4.3', key: 'q4_3', width: 40 },
    { header: 'Ответ 4.3', key: 'a4_3', width: 40 },
    { header: 'Балл 4.3', key: 's4_3', width: 15 },
    { header: 'Вопрос 4.4', key: 'q4_4', width: 40 },
    { header: 'Ответ 4.4', key: 'a4_4', width: 40 },
    { header: 'Балл 4.4', key: 's4_4', width: 15 },
    { header: 'Вопрос 4.5', key: 'q4_5', width: 40 },
    { header: 'Ответ 4.5', key: 'a4_5', width: 40 },
    { header: 'Балл 4.5', key: 's4_5', width: 15 }
  );

  return columns;
}

export const saveResult = async (request, reply) => {
  const { firstName, lastName, totalScore, sectionScores, detailedAnswers } = request.body;

  try {
    const result = await Result.create({
      firstName,
      lastName,
      totalScore,
      answers: detailedAnswers
    });

    if (sectionScores?.length) {
      await SectionScore.bulkCreate(
        sectionScores.map(score => ({
          ...score,
          resultId: result.id
        }))
      );
    }

    if (detailedAnswers?.length) {
      await DetailedAnswer.bulkCreate(
        detailedAnswers.map(answer => ({
          ...answer,
          resultId: result.id
        }))
      );
    }

    return result;
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

export const getResults = async (request, reply) => {
  const { from, to, name } = request.query;
  
  try {
    const where = {};
    
    if (from || to) {
      where.completionDate = {};
      if (from) where.completionDate.$gte = new Date(from);
      if (to) where.completionDate.$lte = new Date(to);
    }
    
    if (name) {
      where.$or = [
        { firstName: { $like: `%${name}%` } },
        { lastName: { $like: `%${name}%` } }
      ];
    }

    const results = await Result.findAll({
      where,
      include: [
        { model: SectionScore, as: 'sectionScores' },
        { model: DetailedAnswer, as: 'detailedAnswers' }
      ],
      order: [['completionDate', 'DESC']]
    });

    return results;
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

export const exportToExcel = async (request, reply) => {
  try {
    const results = await Result.findAll({
      include: [
        { model: SectionScore, as: 'sectionScores' },
        { model: DetailedAnswer, as: 'detailedAnswers' }
      ],
      order: [['completionDate', 'DESC']]
    });

    request.log.info('Starting Excel export with', results.length, 'results');
    
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'StomatQuiz';
    workbook.lastModifiedBy = 'StomatQuiz';
    workbook.created = new Date();
    workbook.modified = new Date();
    
    // Summary worksheet
    const summarySheet = workbook.addWorksheet('Общие результаты', {
      properties: { tabColor: { argb: 'FF00BFFF' } }
    });

    // Define columns
    const columns = getColumns();
    summarySheet.columns = columns;

    // Style the headers
    const headerRow = summarySheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE6F0FF' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    // Add data rows
    results.forEach((result, index) => {
      // Преобразуем sectionScores в объект для удобства
      const sectionScores = {};
      (result.sectionScores || []).forEach(score => {
        sectionScores[score.sectionTitle] = score.score;
      });

      // Группируем ответы по блокам и вопросам
      const answersByBlock = {};
      (result.detailedAnswers || []).forEach(answer => {
        const blockNumber = Math.floor((answer.questionId - 1) / 5) + 1;
        const questionInBlock = ((answer.questionId - 1) % 5) + 1;
        if (!answersByBlock[blockNumber]) {
          answersByBlock[blockNumber] = {};
        }
        answersByBlock[blockNumber][questionInBlock] = answer;
      });

      const totalScore = result.totalScore || 0;

      // Prepare row data
      const rowData = {
        id: result.id,
        lastName: result.lastName,
        firstName: result.firstName,
        date: result.completionDate,
        totalScore: totalScore,
        overallResult: calculateOverallResult(totalScore)
      };

      // Add data for each block
      [1, 2, 3, 4].forEach(blockNum => {
        const blockScore = sectionScores[`Блок ${blockNum}`] || 0;
        const blockResult = calculateTestResult(blockNum, blockScore) || 'Нет данных';
        
        rowData[`block${blockNum}Score`] = blockScore;
        rowData[`block${blockNum}Result`] = blockResult;

        // Add questions and answers for this block
        [1, 2, 3, 4, 5].forEach(questionNum => {
          const answer = answersByBlock[blockNum]?.[questionNum] || {};
          rowData[`q${blockNum}_${questionNum}`] = answer.questionText || '';
          rowData[`a${blockNum}_${questionNum}`] = answer.answerText || '';
          rowData[`s${blockNum}_${questionNum}`] = answer.score || 0;
        });
      });

      const row = summarySheet.addRow(rowData);

      // Style the row
      row.alignment = { vertical: 'middle', wrapText: true };
      if ((index + 2) % 2 === 0) {
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8F8F8' }
        };
      }

      // Format score cells
      row.eachCell((cell, colNumber) => {
        const column = columns[colNumber - 1];
        if (column.key.startsWith('block') && column.key.endsWith('Score') ||
            column.key.startsWith('s') ||
            column.key === 'totalScore') {
          cell.numFmt = '0.00';
          cell.alignment = { horizontal: 'center' };
        } else if (column.key.endsWith('Result')) {
          cell.alignment = { horizontal: 'left', wrapText: true };
          cell.font = { bold: true };
        }
      });
    });

    // Add borders
    summarySheet.eachRow(row => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // Freeze header row and enable filters
    summarySheet.views = [
      { 
        state: 'frozen', 
        xSplit: 0, 
        ySplit: 1, 
        activeCell: 'A2',
        showRowColHeaders: true,
        filterButton: true
      }
    ];

    request.log.info('Generating Excel buffer...');
    const buffer = await workbook.xlsx.writeBuffer();
    request.log.info('Excel buffer generated, size:', buffer.length, 'bytes');

    reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    reply.header('Content-Disposition', 'attachment; filename=results.xlsx');
    
    return buffer;
  } catch (error) {
    request.log.error('Error in exportToExcel:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

export const exportToCSV = async (request, reply) => {
  try {
    const results = await Result.findAll({
      include: [
        { model: SectionScore, as: 'sectionScores' },
        { model: DetailedAnswer, as: 'detailedAnswers' }
      ],
      order: [['completionDate', 'DESC']]
    });

    request.log.info('Starting CSV export with', results.length, 'results');

    // Получаем заголовки из общей функции
    const columns = getColumns();
    const headers = columns.map(col => col.header).join(',') + '\n';

    // Формируем строки данных
    const rows = results.map(result => {
      // Преобразуем sectionScores в объект для удобства
      const sectionScores = {};
      (result.sectionScores || []).forEach(score => {
        sectionScores[score.sectionTitle] = score.score;
      });

      // Группируем ответы по блокам и вопросам
      const answersByBlock = {};
      (result.detailedAnswers || []).forEach(answer => {
        const blockNumber = Math.floor((answer.questionId - 1) / 5) + 1;
        const questionInBlock = ((answer.questionId - 1) % 5) + 1;
        if (!answersByBlock[blockNumber]) {
          answersByBlock[blockNumber] = {};
        }
        answersByBlock[blockNumber][questionInBlock] = answer;
      });

      const totalScore = result.totalScore || 0;

      // Prepare row data
      const rowData = {
        id: result.id,
        lastName: result.lastName,
        firstName: result.firstName,
        date: result.completionDate,
        totalScore: totalScore,
        overallResult: calculateOverallResult(totalScore)
      };

      // Add data for each block
      [1, 2, 3, 4].forEach(blockNum => {
        const blockScore = sectionScores[`Блок ${blockNum}`] || 0;
        const blockResult = calculateTestResult(blockNum, blockScore) || 'Нет данных';
        
        rowData[`block${blockNum}Score`] = blockScore;
        rowData[`block${blockNum}Result`] = blockResult;

        // Add questions and answers for this block
        [1, 2, 3, 4, 5].forEach(questionNum => {
          const answer = answersByBlock[blockNum]?.[questionNum] || {};
          rowData[`q${blockNum}_${questionNum}`] = answer.questionText || '';
          rowData[`a${blockNum}_${questionNum}`] = answer.answerText || '';
          rowData[`s${blockNum}_${questionNum}`] = answer.score || 0;
        });
      });

      // Преобразуем объект в строку CSV
      return columns.map(col => {
        const value = rowData[col.key];
        // Экранируем кавычки и добавляем кавычки вокруг значения если оно содержит запятую
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
    }).join('\n');

    const csv = headers + rows;

    reply.header('Content-Type', 'text/csv');
    reply.header('Content-Disposition', 'attachment; filename=results.csv');
    
    return csv;
  } catch (error) {
    request.log.error('Error in exportToCSV:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};