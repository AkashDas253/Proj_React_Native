import { create, all } from 'mathjs';

const math = create(all);

math.config({
  number: 'BigNumber',
  precision: 64
});

export const processCalculation = (expression) => {
  if (!expression) return '';

  try {
    let query = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, 'pi')
      .replace(/e/g, 'e')
      .replace(/√/g, 'sqrt')
      .replace(/abs\(/g, 'abs(');

    query = query.replace(/log\(/g, 'log10(');
    query = query.replace(/ln\(/g, 'log(');

    const trigs = ['sin', 'cos', 'tan'];
    trigs.forEach(fn => {
      const reg = new RegExp(`${fn}\\(`, 'g');
      query = query.replace(reg, `${fn}((pi/180) * `);
    });

    query = query.replace(/(\d|pi|e|\))(?=[a-z\(]|sqrt|pi|e)/gi, '$1*');

    const openParentheses = (query.match(/\(/g) || []).length;
    const closeParentheses = (query.match(/\)/g) || []).length;
    if (openParentheses > closeParentheses) {
      query += ')'.repeat(openParentheses - closeParentheses);
    }

    const rawResult = math.evaluate(query);

    if (rawResult === undefined || rawResult === null) return 'Error';

    let formatted = math.format(rawResult, {
      precision: 14,
      lowerExp: -10,
      upperExp: 10,
    });

    const finalResult = String(formatted).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1");
    
    return finalResult === '-0' ? '0' : finalResult;

  } catch (err) {
    console.log("Math Engine Error:", err);
    return 'Error';
  }
};