import sys
import json
import random

def best(points):
    best = ''
    top = -10000

    for k in points:
        if points[k] > top:
            top = points[k]
            best = k
    
    return best

def take_quiz(quiz):

    result = {}

    for i in range(len(quiz['questions'])):
        options = quiz['questions'][i]['options']
        points = quiz['points'][i]

        number = random.randint(0, len(options) - 1)

        answer = options[number]
        
        for p in points[answer]:
            result.setdefault(p, 0)
            result[p] += points[answer][p]
    
    #print(result)
    return best(result)

def coverage(quiz):
    s = 0
    results = {}

    for _ in range(5000):
        r = take_quiz(quiz)

        results.setdefault(r, 0)
        results[r] += 1
        s += 1
    
    for k in results:
        results[k] /= s
    
    return results
    
if __name__ == "__main__":
    
    if (len(sys.argv) == 2):
        quiz_name = sys.argv[1]

        with open(quiz_name + '.json') as f:
            quiz = json.load(f)
            results = coverage(quiz)

            length_name = len('coverage for ' + quiz_name)
            longest = length_name

            for r in results:
                if len(r) > longest: longest = len(r)
            
            print('+-' + (longest + 6) * '-' + '-+')
            print('| coverage for ' + quiz_name + ((6 + longest - length_name) * ' ') + ' |')
            print('+-' + (longest + 6) * '-' + '-+')
            for r in dict(sorted(results.items(), key=lambda item: item[1])):
                print('| ' + str(r) + ':' + ((1 + longest - len(r)) * ' ') + "{:.2f}".format(results[r]) + ' |')
            print('+-' + (longest + 6) * '-' + '-+')
    else:
        print("Unexpected inputs")