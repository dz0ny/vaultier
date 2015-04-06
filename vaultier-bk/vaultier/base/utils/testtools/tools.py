def read_file(self, filename):
    file = self.open_file(filename)
    data = file.read()
    file.close()
    return data

