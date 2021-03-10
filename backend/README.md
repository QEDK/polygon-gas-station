This backend is built with [FastAPI](https://fastapi.tiangolo.com). You can get a server running like:
```bash
$ pip3 install -r requirements.txt
$ uvicorn main:app --reload
```
Run `gunicorn -k uvicorn.workers.UvicornWorker` for production.
