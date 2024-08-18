const MCSimulation = 1000;

// D3 graph

const DIM = {
  width: 1500,
  height: 600,
  margin: 60,
};

const numberFormatter = (number) => Intl.NumberFormat("cs-CZ").format(number);

const prepareGraph = (min, max, quartils) => {
  const xScale = d3
    .scaleLinear()
    .domain([0, quartils.length - 1])
    .range([DIM.margin, DIM.width - DIM.margin]);
  const yScale = d3
    .scaleLinear()
    .domain([min - 1000, max + 1000])
    .range([DIM.height - DIM.margin, DIM.margin]);
  const svg = d3
    .create("svg")
    .attr("width", DIM.width)
    .attr("height", DIM.height);
  const meanLine = d3
    .line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d.mean));
  const quartilsLine = d3
    .area()
    .x((d, i) => xScale(i))
    .y0((d) => yScale(d.q3))
    .y1((d) => yScale(d.q1));
  svg
    .append("g")
    .attr("transform", `translate(0, ${DIM.height - DIM.margin})`)
    .call(d3.axisBottom(xScale));
  svg
    .append("g")
    .attr("transform", `translate(${DIM.margin}, 0)`)
    .call(d3.axisLeft(yScale));
  svg
    .append("path")
    .attr("fill", "palegreen")
    .attr("d", quartilsLine(quartils));
  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", meanLine(quartils));

  const textQ1 = svg
    .append("text")
    .attr("alignment-baseline", "middle")
    .attr("transform", `translate(${3 * DIM.margin}, ${DIM.margin})`)
    .text("");
  const textMean = svg
    .append("text")
    .attr("alignment-baseline", "middle")
    .attr("transform", `translate(${3 * DIM.margin}, ${DIM.margin + 20})`)
    .text("");
  const textQ3 = svg
    .append("text")
    .attr("alignment-baseline", "middle")
    .attr("transform", `translate(${3 * DIM.margin}, ${DIM.margin + 40})`)
    .text("");
  const dotMean = svg
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 3)
    .attr("fill", "green");
  const dotQ1 = svg
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 3)
    .attr("fill", "green");
  const dotQ3 = svg
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 3)
    .attr("fill", "green");
  svg.on("mousemove", (e) => {
    const [x, y] = d3.pointer(e);
    const year = Math.round(xScale.invert(x));
    dotQ1.attr("cx", xScale(year)).attr("cy", yScale(quartils[year].q1));
    dotMean.attr("cx", xScale(year)).attr("cy", yScale(quartils[year].mean));
    dotQ3.attr("cx", xScale(year)).attr("cy", yScale(quartils[year].q3));
    textQ1.text(`Q1: ${numberFormatter(quartils[year].q1)} CZK`);
    textMean.text(`Mean: ${numberFormatter(quartils[year].mean)} CZK`);
    textQ3.text(`Q3: ${numberFormatter(quartils[year].q3)} CZK`);
  });

  return svg.node();
};

const displayResults = (quartils) => {
  const root = document.querySelector("div#results");
  const graph = prepareGraph(
    quartils[0].q1,
    quartils[quartils.length - 1].q3,
    quartils,
  );

  if (root.hasChildNodes())
    root.childNodes.forEach((child) => root.removeChild(child));
  root.appendChild(graph);
};

const displayValuation = (valuationPerCent, netInput, gain) => {
  const bold = "font-weight: bold";
  const valuationEl = document.querySelector("#valuation");
  valuationEl.textContent = `${valuationPerCent} %`;
  valuationEl.style = bold;
  const netEl = document.querySelector("#user");
  netEl.textContent = `${numberFormatter(netInput)} CZK`;
  netEl.style = bold;
  const gainEl = document.querySelector("#gain");
  gainEl.textContent = `${numberFormatter(gain)} CZK`;
  gainEl.style = bold;
};

// Business logic

const randomNormDist = (mean = 0, stdev = 1) => {
  return d3.randomNormal(mean, stdev)();
};
const getRandomInflation = () => {
  let inflationRate = document.querySelector("#inflation").value;
  return Math.round(randomNormDist(inflationRate, 1) * 100) / 100;
};

const getRandomInterest = () => {
  let interestRate = document.querySelector("#interest").value;
  return Math.round(randomNormDist(interestRate, 1.5) * 100) / 100;
};

const calculateSimulationQuartils = (portfEvolution) => {
  let yearsQuartils = [];
  const yearItems = portfEvolution[0].length;
  for (let i = 0; i < yearItems; i++) {
    let eachYearFromSimulations = [];
    for (const simulation of portfEvolution) {
      eachYearFromSimulations.push(simulation[i]);
    }
    eachYearFromSimulations.sort((a, b) => a - b);
    const mean =
      eachYearFromSimulations.reduce((accum, curr) => (accum += curr)) /
      MCSimulation;
    const q1 =
      eachYearFromSimulations[Math.round(eachYearFromSimulations.length / 4)];
    const q3 =
      eachYearFromSimulations[
        Math.round((eachYearFromSimulations.length * 3) / 4)
      ];

    yearsQuartils.push({
      q1: q1,
      mean: Math.round(mean),
      q3: q3,
    });
  }
  return yearsQuartils;
};

const calculateOverallValuation = (
  beginPortfolio,
  month,
  years,
  simulatedValueMean,
) => {
  const netInput = month * 12 * years + beginPortfolio;
  const gain = simulatedValueMean - netInput;
  return [Math.round(((gain * 100) / netInput) * 100) / 100, netInput, gain];
};

const simulateOneRun = (portfolio, monthly, years) => {
  let portfEvolution = [];
  const userSave = monthly * 12;
  for (let i = 0; i < years; i++) {
    let inflRate = getRandomInflation();
    let interestRate = getRandomInterest();

    if (i === 0) {
      portfEvolution.push(portfolio + userSave);
      continue;
    }
    const yearPortfolio = portfEvolution[i - 1] + userSave;
    const valuation = yearPortfolio * (interestRate / 100) + yearPortfolio;
    const inflationCleared = valuation - valuation * (inflRate / 100);
    portfEvolution.push(Math.round(inflationCleared));
  }
  return portfEvolution;
};

const simulate = (portfolio, monthly, years) => {
  let portfEvolution = [];
  for (let i = 0; i < MCSimulation; i++) {
    portfEvolution.push(simulateOneRun(portfolio, monthly, years));
  }
  const simulationYearMeans = calculateSimulationQuartils(portfEvolution);
  displayResults(simulationYearMeans);
  const [valuationPerCent, netInput, gain] = calculateOverallValuation(
    portfolio,
    monthly,
    years,
    simulationYearMeans[simulationYearMeans.length - 1].mean,
  );
  displayValuation(valuationPerCent, netInput, gain);
};

// Main

document.querySelector("button").addEventListener("click", () => {
  let portfolio = document.querySelector("#portfolio");
  if (!portfolio.value) portfolio.classList.add("is-invalid");
  else portfolio.classList.remove("is-invalid");

  let monthly = document.querySelector("#monthly");
  if (!monthly.value) monthly.classList.add("is-invalid");
  else monthly.classList.remove("is-invalid");

  let years = document.querySelector("#thorizont");
  if (!years.value) years.classList.add("is-invalid");
  else years.classList.remove("is-invalid");

  simulate(Number(portfolio.value), Number(monthly.value), Number(years.value));
});
