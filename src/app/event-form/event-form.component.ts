import { Component, EventEmitter, Output } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { getDateString, getTomorrowsDate } from '../../helpers/date-helpers'

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent {
  @Output() titleChange = new EventEmitter<string>()
  @Output() dateChange = new EventEmitter<string>()

  minimumDate: string = getDateString(getTomorrowsDate())

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
