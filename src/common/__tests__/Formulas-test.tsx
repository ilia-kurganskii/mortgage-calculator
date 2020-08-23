import {
  calculateAnnuityData,
  calgulateLoanFigures,
  calculateLinearData,
} from '../Formulas';
import { AppState } from '../../App';

const state: AppState = {
  price: 310000,
  notary: 1200,
  valuation: 800,
  financialAdvisor: 2500,
  realStateAgent: 3000,
  structuralSurvey: 800,
  savings: 40000,
  interest: 1.34,
  deduction: 36.93,
};

it('calculates loan figures', () => {
  const figures = calgulateLoanFigures(state);

  expect(figures).toEqual({
    cost: 16817.724068479354,
    loan: 286817.7240684794,
    percentage: 0.9252184647370303,
  });
});

it('calculates annuity data', () => {
  const figures = calgulateLoanFigures(state);

  const annuityData = calculateAnnuityData(
    state.interest,
    state.deduction,
    state.savings,
    figures.loan,
  );

  expect(annuityData.monthly.length).toBe(360);

  // First month
  expect(annuityData.monthly[0]).toEqual({
    balance: 286817.7240684794,
    capitalPaid: 647.7154017575754,
    deduction: 118.27932713997986,
    grossPaid: 967.995193634044,
    interest: 320.2797918764686,
    month: 1,
    netPaid: 849.7158664940641,
  });

  // 15 years
  expect(annuityData.monthly[179]).toEqual({
    balance: 158556.10478164168,
    capitalPaid: 790.9408766278759,
    deduction: 65.38615927037786,
    grossPaid: 967.995193634044,
    interest: 177.05431700616805,
    month: 180,
    netPaid: 902.6090343636661,
  });

  // 30 years
  expect(annuityData.monthly[359]).toEqual({
    balance: 966.9154713546159,
    capitalPaid: 966.9154713576945,
    deduction: 0.3987414366558756,
    grossPaid: 967.995193634044,
    interest: 1.0797222763495142,
    month: 360,
    netPaid: 967.5964521973881,
  });

  expect(annuityData.totals).toEqual({
    totalInterestGross: 61660.545639776916,
    totalInterestNet: 38889.30613500846,
    totalInvestedGross: 388478.2697082563,
    totalInvestedNet: 365707.03020348784,
    totalPaidGross: 348478.2697082563,
    totalPaidNet: 325707.03020348784,
  });
});

it('calculates linear data', () => {
  const figures = calgulateLoanFigures(state);

  const linearData = calculateLinearData(
    state.interest,
    state.deduction,
    state.savings,
    figures.loan,
  );

  expect(linearData.monthly.length).toBe(360);

  // First month
  expect(linearData.monthly[0]).toEqual({
    balance: 286817.7240684794,
    capitalPaid: 796.7159001902205,
    deduction: 118.27932713997986,
    grossPaid: 1116.9956920666891,
    interest: 320.2797918764686,
    month: 1,
    netPaid: 998.7163649267093,
  });

  // 15 years
  expect(linearData.monthly[179]).toEqual({
    balance: 144205.57793442992,
    capitalPaid: 796.7159001902205,
    deduction: 59.46821725648988,
    grossPaid: 957.7454622170005,
    interest: 161.02956202678007,
    month: 180,
    netPaid: 898.2772449605106,
  });

  // 30 years
  expect(linearData.monthly[359]).toEqual({
    balance: 796.7159001902328,
    capitalPaid: 796.7159001902205,
    deduction: 0.32855368649994915,
    grossPaid: 797.6055662787662,
    interest: 0.8896660885457599,
    month: 360,
    netPaid: 797.2770125922663,
  });

  expect(linearData.totals).toEqual({
    totalInterestGross: 57810.50243370258,
    totalInterestNet: 36461.08388493571,
    totalInvestedGross: 384628.22650218196,
    totalInvestedNet: 363278.8079534151,
    totalPaidGross: 344628.22650218196,
    totalPaidNet: 323278.8079534151,
  });
});
