def print_stats(filename):
    with open(filename) as f:
        data = eval(f.read())
    errors = [e for e in data if "err" in e]
    oks = [e for e in data if "err" not in e]
    under_2s = [e for e in oks if e["ping_time"]<2]
    print(f"Number of errors: {len(errors)}")
    print(f"Number of oks: {len(oks)}")
    print(f"Number of oks under 2s: {len(under_2s)}")


if __name__ == "__main__":
    print_stats(filename="temp/test-02-03-01-2023.txt")
