import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexResponsive,
  ApexNonAxisChartSeries
} from "ng-apexcharts";

import { NgApexchartsModule } from "ng-apexcharts";
import { CommonModule } from '@angular/common';

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
};

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Widget data
  totalCustomers: number = 0;
  totalAccounts: number = 0;
  pendingTransactions: number = 0;

  // Line chart options
  public lineChartOptions: Partial<LineChartOptions>;
  // Pie chart options
  public pieChartOptions: Partial<PieChartOptions>;

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {
    // Initialize Line Chart Options
    this.lineChartOptions = {
      series: [
        {
          name: "Customers",
          data: [] // will update after data fetch
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Customer Trend (Last 7 Days)",
        align: "left"
      },
      xaxis: {
        categories: [] // will be updated below
      }
    };

    // Initialize Pie Chart Options
    this.pieChartOptions = {
      series: [],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Customers", "Accounts", "Transactions"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.fetchCustomersCount();
    this.fetchAccountsCount();
    this.fetchPendingTransactionsCount();
  }

  fetchCustomersCount(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.totalCustomers = customers.length;
        this.updateCharts();
      },
      error: (err) => {
        console.error("Error fetching customers", err);
        // Fallback demo value
        this.totalCustomers = 42;
        this.updateCharts();
      }
    });
  }

  fetchAccountsCount(): void {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.totalAccounts = accounts.length;
        this.updateCharts();
      },
      error: (err) => {
        console.error("Error fetching accounts", err);
        this.totalAccounts = 30;
        this.updateCharts();
      }
    });
  }

  fetchPendingTransactionsCount(): void {
    this.transactionService.getPendingTransactions().subscribe({
      next: (transactions) => {
        this.pendingTransactions = transactions.length;
        this.updateCharts();
      },
      error: (err) => {
        console.error("Error fetching pending transactions", err);
        this.pendingTransactions = 5;
        this.updateCharts();
      }
    });
  }

  updateCharts(): void {
    // Update pie chart data
    this.pieChartOptions.series = [
      this.totalCustomers,
      this.totalAccounts,
      this.pendingTransactions
    ];

    // For demonstration, we assume the customer count has been constant for the past 7 days.
    // In a real-world scenario, fetch trend data for each day.
    this.lineChartOptions.series = [{
      name: "Customers",
      data: Array(7).fill(this.totalCustomers)
    }];
    // Set x-axis labels (for example, last 7 days)
    this.lineChartOptions.xaxis = {
      categories: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
    };
  }
}
