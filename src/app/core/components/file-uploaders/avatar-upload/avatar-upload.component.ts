import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiFileLike } from '@taiga-ui/kit';
import { Observable, of, timer } from 'rxjs';
import { map, mapTo, share, startWith, switchMap, tap } from 'rxjs/operators';

class RejectedFile {
  constructor(readonly file: TuiFileLike, readonly reason: string) { }
}

function convertRejected({ file, reason }: RejectedFile): TuiFileLike {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    content: reason,
  };
}

@Component({
  selector: 'mca-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarUploadComponent {
  @Input() readonly form: FormGroup = new FormGroup({});

  public initialImageUrl: SafeUrl;
  public inputImageUrl: SafeUrl;
  public fileInputControl: FormControl = new FormControl();

  public isDropzoneVisible: boolean = false;
  public isLoading: boolean = false;
  public hasError: boolean = false;

  @Output() fileInput: EventEmitter<File> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) { }

  @tuiPure
  get loading$(): Observable<ReadonlyArray<File>> {
    return this.requests$.pipe(
      map(file => (file instanceof File ? [file] : [])),
      startWith([]),
    );
  }

  @tuiPure
  get rejected$(): Observable<ReadonlyArray<TuiFileLike>> {
    return this.requests$.pipe(
      map(file => (file instanceof RejectedFile ? [convertRejected(file)] : [])),
      tap(({ length }) => {
        if (length) {
          this.fileInputControl.setValue(null);
        }
      }),
      startWith([]),
    );
  }

  @tuiPure
  private get requests$(): Observable<RejectedFile | File | null> {
    return this.fileInputControl.valueChanges.pipe(
      switchMap((file: File) => {
        if (file) {
          this._initPreivewImage(file);

          return this._serverRequest(file).pipe(
            tap((serverResponse: File | RejectedFile | null) => {
              this.isLoading = false;

              serverResponse instanceof RejectedFile ? this.hasError = true : this.hasError = false;
            }),
            startWith(file)
          );
        } else {
          this.cancelChangeAvatar();

          return of(null);
        }
      }
      ),
      share(),
    );
  }

  public getFileStatusIcon(): string {
    if (!this.isDropzoneVisible) {
      return 'tuiIconSettingsLarge';
    }
    else if (this.isDropzoneVisible) {
      if (this.isLoading) {
        return 'tuiIconRefreshLarge';
      }

      if (!this.isLoading) {
        if (this.hasError) {
          return 'tuiIconCloseLarge';
        } else {
          return 'tuiIconUploadLarge';
        }
      }
    }
  }

  public initChangeAvatar(isDropzoneVisible: boolean): void {
    if (isDropzoneVisible && !this.hasError) {
      this.isDropzoneVisible = true;
    }

    this._toggleDropzoneVisibility();

  }

  public cancelChangeAvatar(): void {
    this._cancelPreviewImage();
    this.fileInputControl.reset();

    this.isDropzoneVisible = false;
    this.isLoading = false;
    this.hasError = false;
  }

  public hasImageUrl(): boolean {
    const isSafeUrl = (input: any): input is SafeUrl => input !== undefined;
    console.log(isSafeUrl(this.inputImageUrl));

    return isSafeUrl(this.inputImageUrl);
  }

  private _initPreivewImage(file: File): void {
    const imageUrlControl = this.form.get('imageUrl');

    if (!this.initialImageUrl) {
      this.initialImageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrlControl?.value);
    }

    if (file) {
      this.inputImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));

      imageUrlControl?.setValue(this.inputImageUrl);
    }
  }

  private _cancelPreviewImage(): void {
    this.form.get('imageUrl')?.setValue(this.initialImageUrl);
    this.inputImageUrl = null;
  }

  private _toggleDropzoneVisibility(): void {
    this.isDropzoneVisible = !this.isDropzoneVisible;
  }

  private _serverRequest(file: File): Observable<RejectedFile | File | null> {
    this.isLoading = true;
    // const delay = Math.round(Math.random() * 500 + 500);
    const delay = 807; // use this to force success
    // const delay = 2; // use this to force error

    const result =
      delay % 2
        ? null
        : new RejectedFile(file, 'Server responded for odd number of time');


    return timer(delay).pipe(
      // tap(() => this.isLoading = true),
      mapTo(result),
    );
  }

}
