import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { formateDate, getTomorrowsDate } from '../../helpers/date-helpers'
import moment from 'moment'

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent {
  @Input() defaultEventTitle?: string
  @Input({
    transform: (date: moment.Moment | undefined) => {
      if (!date) {
        return ''
      }
      return formateDate(date)
    },
  })
  defaultEventDate?: string

  @Output() titleChange = new EventEmitter<string>()
  @Output() dateChange = new EventEmitter<string>()

  minimumDate: string = formateDate(getTomorrowsDate())

  onChangeTitle(event: Event): void {
    const input = event.target as HTMLInputElement
    this.titleChange.emit(input.value)
  }

  onChangeDate(event: Event): void {
    const input = event.target as HTMLInputElement
    this.dateChange.emit(input.value)
  }

  onSubmit(event: Event): void {
    event.preventDefault()
  }
}
