from __future__ import unicode_literals
import youtube_dl

print 'Paste the URL of the Youtube video and press [Enter]'
YT_URL = raw_input()

ydl_opts = {
    'outtmpl': 'output.mp3',
    'format': 'bestaudio/best',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
}
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download([YT_URL])
