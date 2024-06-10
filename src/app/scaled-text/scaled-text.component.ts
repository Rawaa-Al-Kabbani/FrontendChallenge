import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core'

@Component({
  selector: 'app-scaled-text',
  standalone: true,
  imports: [],
  templateUrl: './scaled-text.component.html',
  styleUrl: './scaled-text.component.scss',
})
export class ScaledTextComponent implements OnChanges {
  @ViewChild('textElement', { static: false }) textElement?: ElementRef

  @Input() text?: string

  ngAfterViewInit() {
    this.scaleFontSize()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('text' in changes) {
      // Wait for the element to re-render with the new text before triggering the re-scaling of the font size.
      setTimeout(() => {
        this.scaleFontSize()
      }, 10)
    }
  }

  onResize() {
    this.scaleFontSize()
  }

  scaleFontSize() {
    if (!this.textElement) {
      return
    }
    const { nativeElement } = this.textElement
    const parent = nativeElement.parentElement.parentElement.parentElement
    const computedFontSize = window.getComputedStyle(nativeElement).fontSize
    const currentFontSize = parseFloat(computedFontSize.substring(0, computedFontSize.length - 2))
    const multiplier = parent.clientWidth / nativeElement.clientWidth
    const newFontSize = Math.floor(multiplier * currentFontSize)
    nativeElement.style.fontSize = `${newFontSize}px`
  }
}
