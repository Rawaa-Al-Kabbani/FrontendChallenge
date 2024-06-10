import { Component, OnInit, OnDestroy } from '@angular/core'
import { ScaledTextComponent } from '../scaled-text/scaled-text.component'
import { EventFormComponent } from '../event-form/event-form.component'
import moment from 'moment'

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [ScaledTextComponent, EventFormComponent],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  eventTitlePrefix: string = 'Time to '

  eventTitle?: string
  eventDate?: moment.Moment

  countdownInterval?: NodeJS.Timeout
  countdownText?: string

  loadEventTitle(): void {
    this.eventTitle = localStorage.getItem('eventTitle') ?? 'Midsummer Eve'
  }

  loadEventDate(): void {
    const date = localStorage.getItem('eventDate')
    if (date) {
      this.eventDate = moment(date)
    } else {
      this.eventDate = moment('2024-06-21')
    }
  }

  ngOnInit(): void {
    this.loadEventTitle()
    this.loadEventDate()
    this.startInterval()
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }
  }

  onTitleChange(newTitle: string): void {
    localStorage.setItem('eventTitle', newTitle)
    this.eventTitle = newTitle
  }

  onDateChange(newDate: string): void {
    localStorage.setItem('eventDate', newDate)
    this.eventDate = moment(newDate)
    this.startInterval()
  }

  startInterval() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }

    this.updateCountdownText()
    this.countdownInterval = setInterval(() => this.updateCountdownText(), 1000)
  }

  updateCountdownText(): void {
    if (!this.eventDate) {
      return
    }

    this.countdownText = this.getCountdownString(this.eventDate)
  }

  getCountdownString(endDate: moment.Moment): string {
    const currentTimestamp = moment()

    let difference = endDate.diff(currentTimestamp) / 1000

    if (difference < 0) {
      return 'Event is already finished'
    }

    const days = Math.floor(difference / (3600 * 24))
    difference -= days * 3600 * 24

    const hours = Math.floor(difference / 3600) % 24
    difference -= hours * 3600

    const minutes = Math.floor(difference / 60) % 60
    difference -= minutes * 60

    const seconds = Math.floor(difference % 60)

    return `${days} days, ${hours} h, ${minutes}m, ${seconds}s`
  }
}
