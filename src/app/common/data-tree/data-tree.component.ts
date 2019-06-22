import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngr-data-tree',
  templateUrl: './data-tree.component.html',
  styleUrls: ['./data-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTreeComponent implements OnInit {
  @Input() treeData: Object = {
    'data': [{
      'title': 'title 1',
      'checked': new FormControl(true),
      'command': function() {console.log(this); },
      'children': [{
        'title': 'title 1a',
        'checked': new FormControl(true),
        'command': function() {console.log(this); },
        'children': [
          {
            'title': 'title 1a1',
            'checked': new FormControl(true),
            'command': function() {console.log(this); },
            'children': [
              {
                'title': 'title 1a1a',
                'checked': new FormControl(false),

                'children': [
                  {
                    'title': 'title 1a1a1',
                    'checked': new FormControl(true),
                    'command': function() {console.log(this); },
                    'children': [
                      {'title': 'title 1a1a1a',
                      'checked': new FormControl(false)
                    },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: '1b',
        'checked': new FormControl(true),
        'command': function() {console.log(this); },

      },
      {
        title: '1c',
        'checked': new FormControl(false),

      },
      {
        title: '1d',
        'checked': new FormControl(false),
      }
      ]
    },
    {
      'title': 'title 2',
      'checked': new FormControl(true),
      'command': function() {console.log(this); },
      'children': [{
        'title': 'title 2a',
        'checked': new FormControl(false),
        'children': [{
          'title': 'title 2a1',
          'checked': new FormControl(true)
        }]
      }]
    }]
  };
  public parentNodesList = [];
  constructor() { }
  onCheckChange(item, parent) {
    if (item.children && item.children.length > 0) {
      item.children.forEach(obj => {
        obj.checked.setValue(item.checked.value, {emitEvent: false});
        if (obj.children && obj.children.length > 0) {
          this.onCheckChange(obj, parent);
        }
      });
    }
  }
  ngOnInit() {
  }
  ss(ii) {
    this.treeData['data'][0].checked.setValue(true);
  } 
}
