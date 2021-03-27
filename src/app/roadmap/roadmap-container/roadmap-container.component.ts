import { Component, OnInit } from '@angular/core';

import { RoadmapService } from '../roadmap.service';
import { dummyData } from '../..//app.config';
import { IRowData, ICardContent } from '../roadmap.interface';
import {
  formatDate,
  getInitialDate,
  timeConvert,
  getDates,
} from '../roadmap.helper';

@Component({
  selector: 'roadmap-container',
  templateUrl: './roadmap-container.component.html',
  styleUrls: ['./roadmap-container.component.scss'],
})
export class RoadmapContainerComponent implements OnInit {
  public rowData: IRowData[] = [];
  public colData: string[] = [];
  public startDate;
  public endDate;
  public formSubmitted: boolean = false;
  public showDetailsPopup: boolean = false;
  public cardDetails: ICardContent;

  constructor(private _roadmapSvc: RoadmapService) {}

  ngOnInit(): void {
    this.parseData();
    this._roadmapSvc.getData().subscribe((data) => {
      // if(data) this.parseData(data);
    });
  }

  parseData() {
    dummyData.issues.forEach((data) => {
      if (data.fields && data.fields.labels && data.fields.labels.length) {
        data.fields.labels.forEach((labl, index) => {
          const id = this.rowData.findIndex((l) => l.label === labl);
          const cardContent: ICardContent = {
            key: data.key,
            labels: data.fields.labels,
            summary: data.fields.summary,
            description: data.fields.description,
            est: data.fields.timeoriginalestimate,
            estimation: timeConvert(data.fields.timeoriginalestimate),
            dueDate: data.fields.duedate,
            fromDate: formatDate(
              getInitialDate(
                data.fields.duedate,
                data.fields.timeoriginalestimate
              )
            ), // considering estimate is in minutes
            toDate: data.fields.duedate,
            initialDate: getInitialDate(
              data.fields.duedate,
              data.fields.timeoriginalestimate
            ),
            issueType: data.fields.issuetype
              ? data.fields.issuetype.name.toLowerCase()
              : '',
            backgroundColor: this.getBackgroundColor(
              data.fields.issuetype
                ? data.fields.issuetype.name.toLowerCase()
                : ''
            ),
          };
          const check =
            cardContent.issueType &&
            cardContent.issueType === 'epic' &&
            cardContent.labels.findIndex((l) => l.toLowerCase() === 'roadmap') >
              -1;
          if (id < 0) {
            let rowGroup = {
              label: labl,
              cardContent: [],
            };
            if (check) rowGroup.cardContent.push(cardContent);
            this.rowData.push(rowGroup);
          } else {
            if (check) this.rowData[id].cardContent.push(cardContent);
          }
        });
      }
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    this.colData = getDates(new Date(this.startDate), new Date(this.endDate));
  }

  existInRange(pDueDate: string) {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const due = new Date(pDueDate);
    return due > start && due < end;
  }

  getLeftPx(pFromDate: string) {
    let timeDiff = new Date(pFromDate).getTime() - new Date(this.startDate).getTime();
    return `${Math.floor(timeDiff / (1000 * 60 * 60 * 24)) * 20}px`;
  }

  showFullDetails(pCardData: ICardContent) {
    this.showDetailsPopup = true;
    this.cardDetails = pCardData;
  }

  getBackgroundColor(pIssueType: string) {
    switch (pIssueType) {
      case 'epic':
        return '#4da5c0';

      case 'story':
        return '#8777d9';

      case 'sub-task':
        return '#ef961d';

      default:
        return '#6b778c';
    }
  }
}
